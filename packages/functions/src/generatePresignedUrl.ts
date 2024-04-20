import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const BUCKET_NAME = process.env.BUCKET_NAME;

export const main: APIGatewayProxyHandlerV2 = async event => {
  try {
    const fileName = event.queryStringParameters?.fileName;
    const fileType = event.queryStringParameters?.fileType;
    const questionText = event.queryStringParameters?.questionText;

    if (!fileName || !fileType || !questionText) {
      return {
        statusCode: 400,
        body: 'Missing fileName or fileType query parameter',
      };
    }

    const client = new S3Client();
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
      Metadata: {
        question: questionText,
      },
    });

    const presignedPostData = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: presignedPostData }),
    };
  } catch (err) {
    console.error('Error generating pre-signed URL', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error generating pre-signed URL' }),
    };
  }
};
