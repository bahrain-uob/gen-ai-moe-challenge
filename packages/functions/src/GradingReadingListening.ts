import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
 
const dynamoDb = new DynamoDB.DocumentClient();

function getEuropeanFrameworkGrade(totalScore: number) {
  if (totalScore >= 36) {
    return 'C2';
  } else if (totalScore >= 32) {
    return 'C1';
  } else if (totalScore >= 28) {
    return 'B2';
  } else if (totalScore >= 24) {
    return 'B1';
  } else if (totalScore >= 20) {
    return 'A2';
  } else {
    return 'A1';
  } 
}

function calculateBandScore(score: number): number {
  if (score >= 39) {
    return 9;
  } else if (score >= 37) {
    return 8.5;
  } else if (score >= 35) {
    return 8;
  } else if (score >= 33) {
    return 7.5;
  } else if (score >= 30) {
    return 7;
  } else if (score >= 29) {
    return 6.5;
  } else if (score >= 23) {
    return 6;
  } else if (score >= 19) {
    return 5.5;
  } else if (score >= 15) {
    return 5;
  } else if (score >= 13) {
    return 4.5;
  } else if (score >= 10) {
    return 4;
  } else if (score >= 8) {
    return 3.5;
  } else if (score >= 6) {
    return 3;
  } else if (score >= 4) {
    return 2.5;
  } else if (score >= 3) {
    return 2;
  } else {
    return 0;
  }
}
 
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { section, sk } = event.pathParameters || {};
  const { studentAnswers } = JSON.parse(event.body || '');
  if(!sk||!section)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request' }),
    };


  const flattenedAnswers = studentAnswers.flat();
  const flattenedStudentAnswers = flattenedAnswers.flat();

 
  console.log('Endpoint received the request:', event);
  console.log('Received student answers:', studentAnswers);
  console.log('Flattened student answers:', flattenedStudentAnswers);
 
  let pks: string[];
 
  if (section === 'reading') {
    pks = ["ReadingP1", "ReadingP2", "ReadingP3"];
  } else {
    pks = ["ListeningP1", "ListeningP2", "ListeningP3", "ListeningP4"];
  }
 
  try {
    let allQuestions = [];
    let allScores = [];
    let totalScore = 0;
    let allCorrectAnswers=[];
 
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
 
        for (let i = 0; i < numOfQuestions; i++) {
          questions.push(partResponseItem.Questions[i]);
          const NumOfSubQuestions = questions[i].NumOfSubQuestions;
          const questionType = questions[i].QuestionType;
 
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
              allScores.push(score);
              allCorrectAnswers.push(correctAnswer);
            }
          } else {//for other question types: summary completion, table completion, graph completion, multiple select...
            const correctAnswers = [];
            let qIndex = 0;
 
            for (let j = 0; j < NumOfSubQuestions; j++) {
              const questionWeight = questions[i].SubQuestions[j].QuestionWeight;
 
              for (let k = 0; k < questionWeight; k++) {
                correctAnswers.push(questions[i].SubQuestions[j].CorrectAnswers[k]);
                const studentAnswer = answersForPart[i][qIndex];
                const isCorrect = correctAnswers[qIndex].includes(studentAnswer);
                const score = isCorrect ? 1 : 0;
                allScores.push(score);
                qIndex++;
                allCorrectAnswers.push(correctAnswers[qIndex]);
              }
            }
          }
        }
 
        allQuestions.push(questions);
      }     
    }

    for (let i = 0; i < allScores.length; i++) {
      const score = allScores[i];
      totalScore += score;
    }
 
   
    const studentSk= section+sk;
 
    console.log("all scores: ", allScores);
    console.log("all questions: ", allQuestions);
   
    const europeanFrameworkGrade = getEuropeanFrameworkGrade(totalScore);
    const bandScore = calculateBandScore(totalScore);
 
    // Store the student response in the table
    const putParams = {
      TableName: process.env.TABLE1_NAME,
      Item: {
        MyPartitionKey: 'student10',
        MySortKey: studentSk,
        CorrectAnswers: allCorrectAnswers,
        studentAnswers: flattenedStudentAnswers,
        scores: allScores,
        totalScore: totalScore,
        BandScore: bandScore,
        europeanFrameworkGrade: europeanFrameworkGrade,
      },
    };
 
    await dynamoDb.put(putParams).promise();
 
    return {
      statusCode: 200,
      body: JSON.stringify({  message: 'Student response stored successfully' }),
    };
 
  } catch (error) {
    console.error('Error retrieving item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};