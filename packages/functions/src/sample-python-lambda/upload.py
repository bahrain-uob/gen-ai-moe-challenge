import boto3
import os
import json
import base64
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')
PollyBucket = os.environ.get('Polly_Bucket')

def upload_file_to_s3(file_name, file_content, content_type):
    try:
        s3_client.put_object(
            Bucket=PollyBucket,
            Key=file_name,
            Body=base64.b64decode(file_content),
            ContentType=content_type
        )
        s3_url = f'https://{PollyBucket}.s3.amazonaws.com/{file_name}'
        return {
            'statusCode': 200,
            'body': json.dumps({'url': s3_url}),
        }
    except ClientError as e:
        print('Error uploading file to S3:', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Error uploading file to S3'}),
        }

def main(event, context):
    try:
        data = json.loads(event['body'])
        file_name = data['file_name']
        file_content = data['file_content']  # Base64 encoded file content
        content_type = data['content_type']

        if not file_name or not file_content or not content_type:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'File name, file content, and content type are required'})
            }

        response = upload_file_to_s3(file_name, file_content, content_type)
        return response

    except Exception as e:
        print('Error in main function:', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Error processing request'}),
        }

if __name__ == "__main__":
    # Simulate a test event and context if needed
    test_event = {
        'body': json.dumps({
            'file_name': 'example.mp3',
            'file_content': base64.b64encode(b'file content').decode('utf-8'),  # Simulated file content
            'content_type': 'audio/mpeg'
        })
    }
    print(main(test_event, None))
