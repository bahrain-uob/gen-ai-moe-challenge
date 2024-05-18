import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WaveSurferPlayer from './waveformListeningTest';

export const SuccessAddListeningQPage: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    if (location.state?.response) {
      const { url } = location.state.response;
      setAudioUrl(url);
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Audio</h1>
      <WaveSurferPlayer audioUrl={audioUrl} />
    </div>
  );
};
