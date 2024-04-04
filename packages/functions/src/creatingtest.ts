import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
const dynamoDb = new DynamoDB.DocumentClient();
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // const testData = JSON.parse(event.body);

  console.log(event.body);
    

//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Item: {
//       examID: uuid.v4(),
//       uploadDate: testData.uploadDate,
//       examPublishDate: testData.examPublishDate,
//       review: testData.review,
//       numberOfTestsTaken: testData.numberOfTestsTaken,
//     },
//   };
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      examID: uuid.v4(),
      uploadDate: "asdf",
      examPublishDate: "asdf",
      review: 1,
      numberOfTestsTaken: 1,
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
};
