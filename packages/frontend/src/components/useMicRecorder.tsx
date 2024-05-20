import { useState, useEffect, useRef } from 'react';

export const useMicRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  //const [audioBlob, setAudioBlob] = useState<Blob>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isRecording) {
      const startRecording = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          mediaRecorderRef.current = new MediaRecorder(stream);

          mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, {
              type: 'audio/webm',
            });
            console.log(blob);
            //setAudioBlob(blob);

            audioChunksRef.current = [];
          };

          mediaRecorderRef.current.start();
        } catch (err) {
          console.error('Error accessing microphone:', err);
        }
      };

      startRecording();
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    }
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return { isRecording, startRecording, stopRecording /*, audioBlob*/ };
};
