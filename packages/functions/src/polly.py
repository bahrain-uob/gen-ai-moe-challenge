import boto3

# Initialize the Polly client
polly_client = boto3.client('polly')
def main(event, context):
    return "Hello from Lambda"

def text_to_speech(text, output_format='mp3', voice_id='Joanna'):
    
    response = polly_client.synthesize_speech(
        Text=text,
        OutputFormat=output_format,
        VoiceId=voice_id
    )
    return response['AudioStream'].read()

if __name__ == "__main__":
    # Example usage
    text = "Hello, how are you?"
    audio_data = text_to_speech(text)
    
    # Save the audio data to a file
    with open('output.mp3', 'wb') as f:
        f.write(audio_data)
