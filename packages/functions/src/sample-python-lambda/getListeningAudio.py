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
                'Bucket': s3_bucket,
                'Key': f'{key}',
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
    s3_url="https://kyte-codecatalyst-sst-app-dbst-pollybucket368908e5-azhk0xyarriv.s3.amazonaws.com/ffd325b9-3832-4c0d-89fc-c9f89a61148a.mp3"
    return generate_presigned_url(s3_url)