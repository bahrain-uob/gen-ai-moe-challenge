import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const audioResponseBucket = process.env.audioResponseBucket;

/*
  Lambda function to generate a pre-signed URL for uploading an
  audio response to S3. The response is stored in the 'uploads_bucket'.
*/
export const main: APIGatewayProxyHandlerV2 = async event => {
  try {
    const fileName = event.queryStringParameters?.fileName;
    const fileType = event.queryStringParameters?.fileType;

    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        body: 'Missing fileName or fileType query parameter',
      };
    }

    const client = new S3Client();
    const command = new PutObjectCommand({
      Bucket: audioResponseBucket,
      Key: fileName,
      ContentType: fileType,
    });

    const presignedPostData = await getSignedUrl(client, command, {
      expiresIn: 300,
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
