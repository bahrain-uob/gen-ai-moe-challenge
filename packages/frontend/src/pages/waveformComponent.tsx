import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferComponentProps {
  audioUrl: string;
  waveColor?: string;
  progressColor?: string;
  height?: number;
}

const WaveSurferComponent: React.FC<WaveSurferComponentProps> = ({
  audioUrl,
  waveColor = 'rgb(59, 130, 142)',
  progressColor = 'rgb(59, 200, 200)',
  height = 200,
}) => {
  const wavesurferRef = useRef<HTMLDivElement | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (wavesurferRef.current) {
      const ws = WaveSurfer.create({
        container: wavesurferRef.current,
        waveColor,
        progressColor,
        height,
      });

      ws.load(audioUrl);
      setWavesurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [audioUrl, waveColor, progressColor, height]);

  const handlePlay = () => {
    if (wavesurfer) {
      wavesurfer.play();
    }
  };

  return (
    <div>
      <div
        ref={wavesurferRef}
        style={{ width: '100%', height: `${height}px` }}
      />
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default WaveSurferComponent;

//check wavesurferComponentExample
