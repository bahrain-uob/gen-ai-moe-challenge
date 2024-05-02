import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client();

export const main: APIGatewayProxyHandlerV2 = async event => {
  try {
    const key = event.pathParameters?.key;
    const bucket = process.env.speakingPollyBucket;

    const input = {
      Bucket: bucket,
      Key: key,
    };

    const command = new GetObjectCommand(input);
    const response = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });
    //const response = await s3Client.send(command);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: response }),
    };
  } catch (error) {
    console.error('Error generating pre-signed URL', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error generating pre-signed URL' }),
    };
  }
};
