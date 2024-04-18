import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { S3 } from "aws-sdk";

const s3 = new S3();
const BUCKET_NAME = process.env.BUCKET_NAME; // Make sure to set this in your environment variables

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const fileName = event.queryStringParameters?.fileName;
    const fileType = event.queryStringParameters?.fileType;

    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        body: "Missing fileName or fileType query parameter",
      };
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Expires: 60, // URL expires in 60 seconds
      ContentType: fileType,
      Metadata: {
        question: event.queryStringParameters?.questionText,
      },
    };

    // 123

    const presignedPostData = await s3.getSignedUrlPromise("putObject", params);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: presignedPostData }),
    };
  } catch (err) {
    console.error("Error generating pre-signed URL", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generating pre-signed URL" }),
    };
  }
};
