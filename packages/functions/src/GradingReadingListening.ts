import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // const testData = JSON.parse(event.body!);
  // const studentAnswers = testData.studentAnswers
  //const partitionKeys = testData.partitionKeys
  //const sortKey = testData.sortKey
  // const section=testData.section
  const { section,  sk } = event.pathParameters || {};
  let pks: string[];

  if(section==='reading'){
    pks = ["ReadingP1", "ReadingP2", "ReadingP3"];// Correction is done for each of these parts
  }
  else{
    pks = ["ListeningP1", "ListeningP2", "ListeningP3","ListeningP4"];// Correction is done for each of these parts
  }

  try {
    /*const studentAnswers = [
      [['C', 'B', 'F', 'G', 'A','A','A', 'B', 'A'], ['Yes', 'Yes', 'No', 'No', 'No']],//part1
      [['A', 'E', 'A', 'G', 'A','A'], ['H','F','C'], ['True', 'True', 'True', 'False']],//part2
      [['A controversial range of prices', 'ok', 'Manual woodworking techniques', 'A', 'E', 'ok', 'c','ok', 'c'], ['True', 'True', 'True', 'False', 'False']]//part3
    ];// for reading and sort key=1 */
    const studentAnswers = [
      [['obscure', 'ok', 'Northwest Africa', 'ok', 'religious'], ['F', 'D', 'ok', 'ok', 'G', 'B', 'ok', 'ok'], ['Interpretations of Viking history']],//part1
      [['Yes', 'Yes', 'No', 'No', 'No','yes'], ['temperature', 'rock', 'ok', 'G', 'ice age', 'F'], ['Viking history and nationalism']],//part2
      [['ok', 'ok', 'F', 'A', 'E', 'ok', 'c'], ['True', 'True', 'True', 'False', 'False', 'False']]//part3
    ];// for reading and sort key=2 
    /*const studentAnswers = [
      [['hostel', 'ok', 'PE9 7QT', 'ok', 'politics','ok','cinema','ok', '4.30 (pm)', '07788 136711']],//part1
      [['A', 'B', 'C', 'D', 'A','A'], ['G','B','D','N']],//part2
      [['A', 'A', 'C', 'B', 'A', 'A'], ['A', 'D', 'E', 'A']],//part3
      [['ok', 'factory', 'ok', 'ok', 'box','ok','rubber','curtains', 'ok', 'international']]//part4
    ];// for listening and sort key=2*/
    console.log(studentAnswers)
    

    let allQuestions = [];
    let allScores = [];

    for (let index = 0; index < pks.length; index++) {
      const pk = pks[index];
      const answersForPart = studentAnswers[index]; // Get the corresponding answers for the part

      const getItemParams = {
        TableName: process.env.TABLE1_NAME,
        Key: {
          MyPartitionKey: pk,
          MySortKey: sk, //sortKey 
        },
      };

      const partResponse = await dynamoDb.get(getItemParams).promise();
      const partResponseItem = partResponse.Item;
      if (partResponseItem && partResponseItem.NumOfQuestions) {
        const numOfQuestions = partResponseItem.NumOfQuestions
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
              console.log(`Question ${i}- ${j} - Student Answer:`, answersForPart[i][j]);
              console.log(`part ${index} Question ${i} subQ ${j} correctAnswer: `, correctAnswer);
              console.log(`part ${index} Question ${i} subQ${j} score: `, score);
              console.log(`part ${index} Question ${i} subQ${j} subQuestionScores: `, subQuestionScores);
            }
            scores.push(subQuestionScores);
          }
          else{//for questionType=== 'Short Answers', 'Table Completion', 'Summary Completion', 'Diagram Completion', 'Multiple Answers', 
            const correctAnswers=[];
            
            console.log(`part ${index} Question ${i} subQ: `, questions[i].SubQuestions);
            let qIndex=0;
            for (let j=0;j<NumOfSubQuestions;j++){
              console.log(`part ${index} Question ${i} subQ ${j}: `, questions[i].SubQuestions[j]);
              const questionWeight=questions[i].SubQuestions[j].QuestionWeight;
              console.log(`Question ${i} - ${j}- questionWeight:`, questionWeight);
              for(let k=0;k<questionWeight;k++){
                
                correctAnswers.push( questions[i].SubQuestions[j].CorrectAnswers[k]);
                //const studentAnswer = studentAnswers[index][i][j+k];
                const studentAnswer = answersForPart[i][qIndex];
                console.log(`Question ${i}- ${j}- ${k}- - Student Answer:`, studentAnswer);
                console.log(`Question ${i} -${j}- ${k}- Correct Answers at ${qIndex}:`, correctAnswers[qIndex]);
                
                const isCorrect = correctAnswers[qIndex].includes(studentAnswer);
                const score = isCorrect ? 1 : 0;
                console.log(`part ${index} Question ${i} - ${j}- ${k}- score:`, score);
                subQuestionScores.push(score);
                console.log(`part ${index} Question ${i} - ${j}- ${k}- subQuestionScores:`, subQuestionScores);
                qIndex++;
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
        MySortKey: sk, //sortKey
        questions: allQuestions,
        studentAnswers: studentAnswers,
        scores: allScores,
      },
    };

    await dynamoDb.put(putParams).promise();

    // Return the student response as the POST body
    const responseBody = {
      MyPartitionKey: 'student7',
      MySortKey: sk,  //sortKey
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