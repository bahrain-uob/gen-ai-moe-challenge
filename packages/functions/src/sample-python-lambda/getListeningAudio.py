import os
from urllib.parse import urlparse
import boto3
import json
from botocore.exceptions import ClientError


s3_client = boto3.client('s3')
audioBucket = os.environ.get('audioBucket')

s3_bucket = audioBucket  # Replace with your S3 bucket name

def generate_presigned_url(s3_url):
    try:
        parsed_url = urlparse(s3_url)
        key = parsed_url.path.lstrip('/')


        url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': "prod-codecatalyst-sst-app-dbst-pollybucket368908e5-ftpqzamr2lpy",
                'Key':"33a35b70-d872-4d46-981e-b9edfff75f99.mp3",
            },
            ExpiresIn=300  # URL expiration time in seconds (300 seconds = 5 minutes)
        )
        print(url)
        return {
            'statusCode': 200,
            'body': json.dumps({'url': url}),
        }
    
    except ClientError as e:
        print('Error generating pre-signed URL:', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Error generating pre-signed URL'}),
        }

    

def main(event,context):
    s3_url="https://prod-codecatalyst-sst-app-dbst-pollybucket368908e5-ftpqzamr2lpy.s3.amazonaws.com/33a35b70-d872-4d46-981e-b9edfff75f99.mp3"
