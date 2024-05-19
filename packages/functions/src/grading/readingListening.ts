import {
  ListeningSection,
  ReadingSection,
  saveFeedback,
} from 'src/utilities/fullTestUtilities';
import { Answer } from '../../../frontend/src/utilities/LRUtilities';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { RLAnswer } from 'src/utilities/fullTestUtilities';

export const gradeReadingListening = async (
  PK: string,
  SK: string,
  questions: ListeningSection | ReadingSection,
  answer: RLAnswer,
  connectionId: string,
  endpoint: string,
  publish: boolean = false,
) => {
  if (!answer.answer) {
    return { error: 'No answer provided' };
  }

  const feedback = gradeRL(questions, answer.answer);

  console.log('Feedback:', feedback);
  const sectionAnswer =
    questions.PK == 'reading' ? 'readingAnswer' : 'listeningAnswer';

  // Save feedback to the DB
  const newTestItem = await saveFeedback(PK, SK, sectionAnswer, feedback);
  // Send feedback to the client
  const apiClient = new ApiGatewayManagementApiClient({
    endpoint: endpoint,
  });
  const command = new PostToConnectionCommand({
    ConnectionId: connectionId,
    Data: JSON.stringify(publish ? newTestItem : questions.PK + ' graded'),
  });
  const response = await apiClient.send(command);
};

const gradeRL = (
  question: ListeningSection | ReadingSection,
  answer: Answer,
) => {
  const studentAnswers = answer;

  const flattenedStudentAnswers = studentAnswers.flat(3);
  let counter = 0;

  console.log('Received student answers:', studentAnswers);
  console.log('Flattened student answers:', flattenedStudentAnswers);

  let pks: ('P1' | 'P2' | 'P3' | 'P4')[];

  if (question.PK === 'reading') {
    pks = ['P1', 'P2', 'P3'];
  } else {
    pks = ['P1', 'P2', 'P3', 'P4'];
  }

  try {
    let allQuestions = [];
    let allScores = [];
    let totalScore = 0;
    let allCorrectAnswers = [];

    for (let index = 0; index < pks.length; index++) {
      //   const pk = pks[index];

      //   const getItemParams = {
      //     TableName: process.env.TABLE1_NAME,
      //     Key: {
      //       MyPartitionKey: pk,
      //       MySortKey: sk,
      //     },
      //   };
      const partResponseItem = question[pks[index]];
      //   const partResponse = await dynamoDb.get(getItemParams).promise();
      //   const partResponseItem = partResponse.Item;

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
              const isCorrect =
                flattenedStudentAnswers[counter] === correctAnswer;
              const score = isCorrect ? 1 : 0;
              allScores.push(score);
              allCorrectAnswers.push(correctAnswer);
              counter++;
            }
          } else {
            //for other question types: summary completion, table completion, graph completion, multiple select...
            const correctAnswers = [];
            let qIndex = 0;

            for (let j = 0; j < NumOfSubQuestions; j++) {
              const questionWeight =
                questions[i].SubQuestions[j].QuestionWeight;
              for (let k = 0; k < questionWeight; k++) {
                correctAnswers.push(
                  questions[i].SubQuestions[j].CorrectAnswers[k],
                );
                const studentAnswer = flattenedStudentAnswers[counter].trim();
                const isCorrect =
                  correctAnswers[qIndex].includes(studentAnswer);
                const score = isCorrect ? 1 : 0;
                allScores.push(score);
                allCorrectAnswers.push(correctAnswers[qIndex]);
                qIndex++;
                counter++;
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

    // const studentSk = section + sk;

    const europeanFrameworkGrade = getEuropeanFrameworkGrade(totalScore);
    const bandScore = calculateBandScore(totalScore);
    console.log('student answers: ', studentAnswers);
    console.log('answers: ', allCorrectAnswers);

    // // Store the student response in the table
    // const putParams = {
    //   TableName: process.env.TABLE1_NAME,
    //   Item: {
    //     MyPartitionKey: 'student8',
    //     MySortKey: studentSk,
    //     CorrectAnswers: allCorrectAnswers,
    //     studentAnswers: studentAnswers,
    //     scores: allScores,
    //     totalScore: totalScore,
    //     BandScore: bandScore,
    //     europeanFrameworkGrade: europeanFrameworkGrade,
    //   },
    // };

    // await dynamoDb.put(putParams).promise();

    return {
      CorrectAnswers: allCorrectAnswers,
      studentAnswers: studentAnswers,
      scores: allScores,
      totalScore: totalScore,
      BandScore: bandScore,
      europeanFrameworkGrade: europeanFrameworkGrade,
    };
  } catch (error) {
    console.error('Error retrieving item:', error);
    return { error: 'Internal Server Error' };
  }
};

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
