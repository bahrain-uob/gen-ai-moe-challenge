import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // const testData = JSON.parse(event.body!);
  // const studentAnswers = testData.studentAnswers
  //const partitionKeys = testData.partitionKeys
  //const sortKey = testData.sortKey
  try {
    const pks = ["ReadingP1", "ReadingP2", "ReadingP3"]; // Correction is done for each of these parts
    const studentAnswers = [
      [['C', 'B', 'F', 'G', 'A','A','A', 'B', 'A'], ['Yes', 'Yes', 'No', 'No', 'No']],//part1
      [['A', 'E', 'A', 'G', 'A','A'], ['H','F','C'], ['True', 'True', 'True', 'False']],//part2
      [['A controversial range of prices', 'ok', 'Manual woodworking techniques', 'A', 'E', 'ok', 'c','ok', 'c'], ['True', 'True', 'True', 'False', 'False']]//part3
    ];
    /*const studentAnswers = [
      [['obscure', 'ok', 'Northwest Africa', 'ok', 'religious'], ['F', 'D', 'ok', 'ok', 'G', 'B', 'ok', 'ok'], ['Interpretations of Viking history']],//part1
      [['Yes', 'Yes', 'No', 'No', 'No','yes'], ['temperature', 'rock', 'ok', 'G', 'ice age', 'F'], ['Viking history and nationalism']],//part2
      [['ok', 'ok', 'F', 'A', 'E', 'ok', 'c'], ['True', 'True', 'True', 'False', 'False', 'False']]//part3
    ];// for sort key=2 */

    let allQuestions = [];
    let allScores = [];

    for (let index = 0; index < pks.length; index++) {
      const pk = pks[index];
      const answersForPart = studentAnswers[index]; // Get the corresponding answers for the part

      const getItemParams = {
        TableName: process.env.TABLE1_NAME,
        Key: {
          MyPartitionKey: pk,
          MySortKey: '1', //sortKey 
        },
      };

      const partResponse = await dynamoDb.get(getItemParams).promise();
      const partResponseItem = partResponse.Item;
      if (partResponseItem && partResponseItem.NumOfQuestions) {
        const numOfQuestions = parseInt(partResponseItem.NumOfQuestions, 10);
        const questions = [];
        const scores = [];


        for (let i = 0; i < numOfQuestions; i++) {
          questions.push(partResponseItem.Questions[i]);
          const NumOfSubQuestions = questions[i].NumOfSubQuestions;
          const questionType = questions[i].QuestionType;
          const subQuestionScores = [];
          console.log(`part ${index} Question ${i} questionType: `, questionType);

          if (
            questionType === 'Matching Paragraph Information' ||
            questionType === 'True False Not Given' ||
            questionType === 'List Selection' ||
            questionType === 'Matching Headings' ||
            questionType === 'Yes No Not Given' ||
            questionType === 'Choosing a Title'||
            questionType === 'Classification' ||
            questionType === 'Matching Sentence Endings'||
            questionType === 'Multiple Choice'
          )
          {
            console.log(`part ${index} Question ${i} subQ: `, questions[i].SubQuestions);
            for (let j = 0; j < NumOfSubQuestions; j++) {
              const correctAnswer = questions[i].SubQuestions[j].CorrectAnswer;
              const isCorrect = answersForPart[i][j] === correctAnswer;
              const score = isCorrect ? 1 : 0;
              subQuestionScores.push(score);
              console.log(`part ${index} Question ${i} subQ${j} score: `, score);
            }
            scores.push(subQuestionScores);
          }
          else{
            const correctAnswers=[];
            
            console.log(`part ${index} Question ${i} subQ: `, questions[i].SubQuestions);
            for (let j=0;j<NumOfSubQuestions;j++){
              console.log(`part ${index} Question ${i} subQ ${j}: `, questions[i].SubQuestions[j]);
              const questionWeight=questions[i].SubQuestions[j].QuestionWeight;
              console.log(`Question ${i} - ${j}- questionWeight:`, questionWeight);
              for(let k=0;k<questionWeight;k++){
                correctAnswers.push( questions[i].SubQuestions[j].CorrectAnswers[k]);
                const studentAnswer = studentAnswers[index][i][j+k];
                console.log(`Question ${i} - Student Answer:`, studentAnswer);
                console.log(`Question ${i} -${j}- ${k}- Correct Answers at ${j+k}:`, correctAnswers[j+k]);
            
                const isCorrect = correctAnswers[j+k].includes(studentAnswer);
                const score = isCorrect ? 1 : 0;
                console.log(`part ${index} Question ${i} - ${j}- ${k}- score:`, score);
                subQuestionScores.push(score);
                console.log(`part ${index} Question ${i} - ${j}- ${k}- subQuestionScores:`, subQuestionScores);
              }
            }
            scores.push(subQuestionScores);
          }
          console.log("scores : ", scores);
          console.log("questions : ", questions);
        }
        allQuestions.push(questions);
        allScores.push(scores);       
      }
    }

    console.log("all scores: ", allScores);
    console.log("all questions: ", allQuestions);

    // Store the student response in the table
    const putParams = {
      TableName: process.env.TABLE1_NAME,
      Item: {
        MyPartitionKey: 'student7',
        MySortKey: "1", //sortKey
        questions: allQuestions,
        studentAnswers: studentAnswers,
        scores: allScores,
      },
    };

    await dynamoDb.put(putParams).promise();

    // Return the student response as the POST body
    const responseBody = {
      MyPartitionKey: 'student7',
      MySortKey: "1",  //sortKey
      questions: allQuestions,
      studentAnswers: studentAnswers,
      scores: allScores,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };

  } catch (error) {
    console.error('Error retrieving item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};