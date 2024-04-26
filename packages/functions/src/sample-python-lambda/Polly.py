import boto3
import os
import uuid
from pydub import AudioSegment
AudioSegment.converter = "ffmpeg"

# Create a client using the AWS SDK for Python (Boto3)
polly = boto3.client('polly', region_name='us-east-1')  # Replace 'your-region' with your AWS region
s3 = boto3.client('s3')

def text_to_speech(conversation):
    voices = ['Joanna', 'Matthew', 'Joey', 'Lupe']  # Specify the voices for each speaker
    output_files = []

    for line in conversation:
        text = f"<speak>{line['speech']}<break time='1s'/></speak>"
        response = polly.synthesize_speech(Text=text, VoiceId=line["speaker"], OutputFormat='mp3', TextType='ssml')
        
        output_file = f"{uuid.uuid4()}.mp3"  # Output file named after the speaker
        output_files.append(output_file)

        # Save audio stream to file
        if "AudioStream" in response:
            with open(output_file, "wb") as f:
                f.write(response["AudioStream"].read())
            print(line["speaker"], f"'s text converted to speech and saved as {output_file}")
        else:
            print(line["speaker"], "'s text to speech")

    return output_files

def merge_audio_files(output_files):
    combined_audio = AudioSegment.empty()
    for file_name in output_files:
            audio = AudioSegment.from_file(file_name, format="mp3")
            combined_audio += audio

    merged_file_name = f"{uuid.uuid4()}.mp3"
    combined_audio.export(merged_file_name, format="mp3")
    return merged_file_name

def upload_to_s3(file_name):
    bucket_name = 'pollytestt'  # Replace 'your-bucket-name' with your S3 bucket name
    
    # Upload files to S3
    with open(file_name, 'rb') as f:
        s3.upload_fileobj(f, bucket_name, file_name)

    # Remove local files
    

    # Return the S3 URL of the uploaded file
    return f"https://{bucket_name}.s3.amazonaws.com/{file_name}"

def main(context, event):
    # Example conversation
    conversation = [
        {"speaker": "Joanna", "speech": "Hello, this is Alice. How are you?"},
        {"speaker": "Matthew", "speech": "Hi, this is Bob. I'm doing well, thanks for asking."},
    ]

    # Convert conversation to speech
    output_files = text_to_speech(conversation)

    # Merge the audio files
    merged_file_name = merge_audio_files(output_files)

    # Upload the merged file to S3 and get the URL
    s3_url = upload_to_s3(merged_file_name)

 

    # Return the S3 URL
    return {"s3_url": s3_url}