import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferPlayerProps {
  audioUrl: string;
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({ audioUrl }) => {
  const wavesurferContainerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (audioUrl && wavesurferContainerRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: wavesurferContainerRef.current,
        waveColor: 'rgb(59, 130, 142)',
        progressColor: 'rgb(59, 200, 200)',
        height: 200,
        interact: false,
      });
      wavesurferRef.current.load(audioUrl);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.play();
      setAudioPlayed(true);
    }
  };

  return (
    <div>
      <div
        ref={wavesurferContainerRef}
        style={{ width: '100%', height: '200px' }}
      />
      {!audioPlayed && <button onClick={handlePlay}>Play</button>}
    </div>
  );
};

export default WaveSurferPlayer;
