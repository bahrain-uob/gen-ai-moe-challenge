import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferComponentProps {
  audioUrl: string;
  waveColor?: string;
  progressColor?: string;
  height?: number;
}

export const WaveSurferComponent: React.FC<WaveSurferComponentProps> = ({
  audioUrl,
}) => {
  const wavesurferRef = useRef<HTMLDivElement | null>(null);
  // const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (wavesurferRef.current) {
      const ws = WaveSurfer.create({
        container: wavesurferRef.current,
        waveColor: 'rgb(59, 130, 142)',
        progressColor: 'rgb(59, 200, 200)',
        // Bar look
        barWidth: 5,
        barRadius: 4,
        barGap: 2,
        // Don't allow modifications
        interact: false,
      });

      ws.load(audioUrl);
      // setWavesurfer(ws);
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
