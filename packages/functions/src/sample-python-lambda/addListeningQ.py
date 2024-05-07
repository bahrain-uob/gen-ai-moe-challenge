from io import BytesIO
from urllib.parse import urlparse
import boto3
import os
import uuid
import json
from botocore.exceptions import ClientError



polly = boto3.client('polly', region_name='us-east-1') 
s3 = boto3.client('s3')
PollyBucket = os.environ.get('Polly_Bucket')
possibleSpeakers = ["Gregory", "Joey", "Matthew", "Stephen", "Joanna",
                    "Salli", "Kimberly", "kendra", "Ruth", "Danielle"]

invalidSpeaker = {
    'statusCode': 400,
    'body': "Invalid Speaker"
}

def text_to_speech(speech, speaker):
    
    text = f"<speak>{speech}<break time='1s'/></speak>"
    response = polly.synthesize_speech(Text=text, VoiceId=speaker, OutputFormat='mp3', TextType='ssml', Engine='neural')
    
    return response["AudioStream"].read()


def main(event,context):

    data = json.loads(event['body'])
    print(data)
    speeches =json.loads(data)
    audio_streams = []
    for i,line in enumerate(speeches):
        
        speaker=line['speaker']
        speech=line['speech']
        gender = line['gender']
        speaker = gender
        if speaker not in possibleSpeakers:
            print(speaker)
            return invalidSpeaker
        audio_stream = text_to_speech(speech,speaker)
        audio_streams.append(audio_stream)
        
    concatenated_audio = b"".join(audio_streams)
    audio_fileobj = BytesIO(concatenated_audio)
    Key=str(uuid.uuid4())
    s3.put_object(Body=audio_fileobj, Bucket=PollyBucket, Key=Key + ".mp3")
    s3_url =  f'https://{PollyBucket}.s3.amazonaws.com/{Key}'
  
    return generate_presigned_url(s3_url)




s3_client = boto3.client('s3')
s3_bucket = PollyBucket  # Replace with your S3 bucket name

def generate_presigned_url(s3_url):
    try:
        parsed_url = urlparse(s3_url)
        key = parsed_url.path.lstrip('/')


        url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': s3_bucket,
                'Key': f'{key}.mp3',
            },
            ExpiresIn=300  # URL expiration time in seconds (300 seconds = 5 minutes)
        )
        
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

    
