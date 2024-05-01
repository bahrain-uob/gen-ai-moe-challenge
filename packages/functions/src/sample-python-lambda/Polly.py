import boto3
import os
import uuid
from pydub import AudioSegment
AudioSegment.converter = "ffmpeg"

polly = boto3.client('polly', region_name='us-east-1') 
s3 = boto3.client('s3')
PollyBucket = os.environ.get('Polly_Bucket')

def text_to_speech(conversation):
    voices = ['Joanna', 'Matthew', 'Joey', 'Lupe']  
    output_files = []

    for line in conversation:
        text = f"<speak>{line['speech']}<break time='1s'/></speak>"
        response = polly.synthesize_speech(Text=text, VoiceId=line["speaker"], OutputFormat='mp3', TextType='ssml',Engine = 'neural')
        
        output_file = f"{uuid.uuid4()}.mp3" 
        output_files.append(output_file)

        if "AudioStream" in response:
            with open(output_file, "wb") as f:
                f.write(response["AudioStream"].read())
           
        
          

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

import os

def upload_to_s3(file_name):
    bucket_name = PollyBucket
    
   
    with open(file_name, 'rb') as f:
        s3.upload_fileobj(f, bucket_name, file_name)
        os.remove(file_name)
   
    

    
    return f"https://{bucket_name}.s3.amazonaws.com/{file_name}"

    return s3_url
def main(context, event):
  
    conversation = [
        {"speaker": "Joanna", "speech": "Hello, this is Alice. How are you?"},
        {"speaker": "Matthew", "speech": "Hi, this is Bob. I'm doing well, thanks for asking."},
        {"speaker": "Joanna", "speech": "Hi, this is Bob. I'm doing well, thanks for asking."},
    ]

  
    output_files = text_to_speech(conversation)

    
    merged_file_name = merge_audio_files(output_files)

   
    s3_url = upload_to_s3(merged_file_name)


    return {"s3_url": s3_url}

 #https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/polly/client/synthesize_speech.html
