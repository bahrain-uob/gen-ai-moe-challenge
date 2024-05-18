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
}) => {
  const wavesurferRef = useRef<HTMLDivElement | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (wavesurferRef.current) {
      const ws = WaveSurfer.create({
        container: wavesurferRef.current,
        waveColor: 'rgb(59, 130, 142)',
        progressColor: 'rgb(59, 200, 200)',
      });

      ws.load(audioUrl);
      setWavesurfer(ws);
      const id = setTimeout(() => ws.play(), 5000);

      return () => {
        ws.destroy();
        clearTimeout(id);
      };
    }
  }, [audioUrl]);

  return (
    <div>
      <div ref={wavesurferRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default WaveSurferComponent;

//check wavesurferComponentExample
