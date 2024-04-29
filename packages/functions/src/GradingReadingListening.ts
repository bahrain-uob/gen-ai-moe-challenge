import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
 
const dynamoDb = new DynamoDB.DocumentClient();
 
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { section, sk } = event.pathParameters || {};
  const { studentAnswers } = JSON.parse(event.body || '');
 
  console.log('Endpoint received the request:', event);
  console.log('Received student answers:', studentAnswers);
 
  let pks: string[];
 
  if (section === 'reading') {
    pks = ["ReadingP1", "ReadingP2", "ReadingP3"];
  } else {
    pks = ["ListeningP1", "ListeningP2", "ListeningP3", "ListeningP4"];
  }
 
  function getEuropeanFrameworkGrade(totalScore: number) {
    if (totalScore >= 39) {
      return 'C2';
    } else if (totalScore >= 37) {
      return 'C1';
    } else if (totalScore >= 35) {
      return 'c1';
    } else if (totalScore >= 33) {
      return 'B2 ';
    } else if (totalScore >= 30) {
      return 'B2';
    } else if (totalScore >= 27) {
      return 'B1';
    } else if (totalScore >= 23) {
      return 'A2';
    } else if (totalScore >= 19) {
      return 'A1';
    } else if (totalScore >= 15) {
      return  'A1';
    } else {
      return 'A1';
    }
  }
 
  try {
    let allQuestions = [];
    let allScores = [];
    let totalScore = 0;
 
    for (let index = 0; index < pks.length; index++) {
      const pk = pks[index];
      const answersForPart = studentAnswers[index];
 
      const getItemParams = {
        TableName: process.env.TABLE1_NAME,
        Key: {
          MyPartitionKey: pk,
          MySortKey: sk,
        },
      };
 
      const partResponse = await dynamoDb.get(getItemParams).promise();
      const partResponseItem = partResponse.Item;
 
      if (partResponseItem && partResponseItem.NumOfQuestions) {
        const numOfQuestions = partResponseItem.NumOfQuestions;
        const questions = [];
        const scores = [];
 
        for (let i = 0; i < numOfQuestions; i++) {
          questions.push(partResponseItem.Questions[i]);
          const NumOfSubQuestions = questions[i].NumOfSubQuestions;
          const questionType = questions[i].QuestionType;
          const subQuestionScores = [];
 
          if (
            questionType === 'Matching Paragraph Information' ||
            questionType === 'True False Not Given' ||
            questionType === 'List Selection' ||
            questionType === 'Matching Headings' ||
            questionType === 'Yes No Not Given' ||
            questionType === 'Choosing a Title' ||
            questionType === 'Classification' ||
            questionType === 'Matching Sentence Endings' ||
            questionType === 'Multiple Choice'
          ) {
            for (let j = 0; j < NumOfSubQuestions; j++) {
              const correctAnswer = questions[i].SubQuestions[j].CorrectAnswer;
              const isCorrect = answersForPart[i][j] === correctAnswer;
              const score = isCorrect ? 1 : 0;
              subQuestionScores.push(score);
            }
            scores.push(subQuestionScores);
          } else {
            const correctAnswers = [];
            let qIndex = 0;
 
            for (let j = 0; j < NumOfSubQuestions; j++) {
              const questionWeight = questions[i].SubQuestions[j].QuestionWeight;
 
              for (let k = 0; k < questionWeight; k++) {
                correctAnswers.push(questions[i].SubQuestions[j].CorrectAnswers[k]);
                const studentAnswer = answersForPart[i][qIndex];
                const isCorrect = correctAnswers[qIndex].includes(studentAnswer);
                const score = isCorrect ? 1 : 0;
                subQuestionScores.push(score);
                qIndex++;
              }
            }
            scores.push(subQuestionScores);
          }
        }
 
        allQuestions.push(questions);
        allScores.push(scores);
 
        for (let i = 0; i < scores.length; i++) {
            const subQuestionScores = scores[i];
            for (let j = 0; j < subQuestionScores.length; j++) {
              const subScore = subQuestionScores[j];
              totalScore += subScore;
            }
          }
 
 
         }
 
         
    }
 
    const studentSk= section+sk;
 
    console.log("all scores: ", allScores);
    console.log("all questions: ", allQuestions);
   
    const europeanFrameworkGrade = getEuropeanFrameworkGrade(totalScore);
 
    // Store the student response in the table
    const putParams = {
      TableName: process.env.TABLE1_NAME,
      Item: {
        MyPartitionKey: 'student10',
        MySortKey: studentSk,
        questions: allQuestions,
        studentAnswers: studentAnswers,
        scores: allScores,
        totalScore: totalScore,
        europeanFrameworkGrade: europeanFrameworkGrade,
      },
    };
 
    await dynamoDb.put(putParams).promise();
 
    // Return the student response as the POST body
  /*  const responseBody = {
      MyPartitionKey: 'student10',
      MySortKey: sk,
      questions: allQuestions,
      studentAnswers: studentAnswers,
      scores: allScores,
      totalScore: totalScore,
      europeanFrameworkGrade: europeanFrameworkGrade,
    };*/
 
    return {
      statusCode: 200,
      body: JSON.stringify({  message: 'Student response stored successfully' }),
      //body: JSON.stringify(responseBody),
    };
 
  } catch (error) {
    console.error('Error retrieving item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};