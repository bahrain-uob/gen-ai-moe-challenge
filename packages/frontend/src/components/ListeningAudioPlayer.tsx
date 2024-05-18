import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferPlayerProps {
  urls: string[];
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({ urls }) => {
  const wavesurferContainerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (urls.length && wavesurferContainerRef.current) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      wavesurferRef.current = WaveSurfer.create({
        container: wavesurferContainerRef.current,
        waveColor: 'rgb(59, 130, 142)',
        progressColor: 'rgb(59, 200, 200)',
        height: 200,
        interact: false,
      });

      wavesurferRef.current.load(urls[trackIndex]);

      wavesurferRef.current.on('finish', () => {
        if (trackIndex < urls.length - 1) {
          setTrackIndex((prevIndex) => prevIndex + 1);
          setAudioPlayed(false); // Reset audioPlayed for the next track
        }
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [trackIndex, urls]);

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
      <div className="h-full w-full flex flex-row items-center px-4">
        <span className="px-4">
          Part {trackIndex + 1}
        </span>
      </div>
    </div>
  );
};

export default WaveSurferPlayer;
