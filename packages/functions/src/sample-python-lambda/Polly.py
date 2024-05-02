import boto3
import os
import uuid
from pydub import AudioSegment
import json

AudioSegment.converter = "ffmpeg"

polly = boto3.client('polly', region_name='us-east-1') 
s3 = boto3.client('s3')
PollyBucket = os.environ.get('Polly_Bucket')

def text_to_speech(conversation):
    output_files = []
    
    for line in conversation:
        text = f"<speak>{line['speech']}<break time='1s'/></speak>"
        response = polly.synthesize_speech(Text=text, VoiceId=line['speaker'], OutputFormat='mp3', TextType='ssml', Engine='neural')
        
        output_file = f"{uuid.uuid4()}.mp3" 
        output_files.append(output_file)

        if "AudioStream" in response:
            with open(output_file, "wb") as f:
                f.write(response["AudioStream"].read())
    conversation+=line['speech']
    return output_files

def merge_audio_files(output_files):
    combined_audio = AudioSegment.empty()
    for file_name in output_files:
        audio = AudioSegment.from_file(file_name, format="mp3")
        combined_audio += audio    
        os.remove(file_name)

    merged_file_name = f"{uuid.uuid4()}.mp3"
    combined_audio.export(merged_file_name, format="mp3")
    return merged_file_name

def upload_to_s3(file_name):
    bucket_name = PollyBucket
    
    with open(file_name, 'rb') as f:
        s3.upload_fileobj(f, bucket_name, file_name)
        os.remove(file_name)
    
    return f"https://{bucket_name}.s3.amazonaws.com/{file_name}"


  

def main(event,context):
    conversation = []  
    data = json.loads(event['body'])
    speaker = data['speaker']
    speech = data['speech']
    textt = f"speaker:{line[speaker} , speech:{line[speech]}"
    print(f"Speaker: {speaker}, Speech: {speech}")

    if speaker == 'male' and all(line['speaker'] == 'male' for line in speech):
        voices = ['Joey', 'Matthew'] 
        
    elif speaker == 'female' and all(line['speaker'] == 'female' for line in speech):
        voices = ['Joanna', 'Kendra'] 
    else:
        voices = ['Joanna', 'Joey']

    for i, line in enumerate(speech):
        line['speaker'] = voices[i % len(voices)]
    
    output_files = text_to_speech(line[speech])
    
    merged_file_name = merge_audio_files(output_files)
    
    s3_url = upload_to_s3(merged_file_name)

    return {'statusCode': 200,
        'body': json.dumps({'s3_url': s3_url})
        }
