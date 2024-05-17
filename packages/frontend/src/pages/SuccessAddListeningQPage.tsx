import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import WaveSurfer from 'wavesurfer.js';

export const SuccessAddListeningQPage: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState('');
  const [audioPlayed, setAudioPlayed] = useState(false);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (location.state?.response) {
      const { url } = location.state.response;
      setAudioUrl(url);
      setIsLoading(false);
    }
  }, [location.state]);

  const handlePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.play();
      setAudioPlayed(true);
    }
  };

  useEffect(() => {
    if (audioUrl && wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: wavesurferRef.current,
        waveColor: 'rgb(59, 130, 142)',
        progressColor: 'rgb(59, 200, 200)',
        height: 200,
        interact: false,
      });
      wavesurfer.load(audioUrl);
      wavesurfer.on('ready', () => {});
      wavesurferRef.current = wavesurfer;
    }
  }, [audioUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Audio</h1>
      <div ref={wavesurferRef} style={{ width: '100%', height: '200px' }} />
      {!audioPlayed && <button onClick={handlePlay}>Play</button>}{' '}
    </div>
  );
};
