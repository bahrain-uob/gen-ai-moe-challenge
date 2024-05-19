import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferPlayerProps {
  urls: string[];
  height: number;
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({
  urls,
  height,
}) => {
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
        waveColor: '#9ca3af',
        progressColor: '#92C7CF',
        height: height,
        interact: false,
      });

      wavesurferRef.current.load(urls[trackIndex]);

      wavesurferRef.current.on('finish', () => {
        if (trackIndex < urls.length - 1) {
          setTrackIndex(prevIndex => prevIndex + 1);
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
    <div className="flex w-full items-center">
      <span className="px-4">Part {trackIndex + 1}</span>
      <div
        ref={wavesurferContainerRef}
        style={{ height: height }}
        className="flex-grow"
      />
      {!audioPlayed && (
        <button
          type="button"
          className="focus:outline-none text-white bg-green-600
            hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium
            rounded-lg text-sm px-3 h-10 ml-2 dark:bg-green-600
            dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handlePlay}
        >
          Play
        </button>
      )}
    </div>
  );
};

export default WaveSurferPlayer;
