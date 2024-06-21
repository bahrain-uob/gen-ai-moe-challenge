import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface ComponentProps {
  trackIndex: number;
  url: string;
  height: number;
  onFinish?: () => void;
}

export const SpeakingAudioPlayer: React.FC<ComponentProps> = ({
  trackIndex,
  url,
  height,
  onFinish,
}) => {
  const wavesurferContainerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (wavesurferContainerRef.current) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      wavesurferRef.current = WaveSurfer.create({
        container: wavesurferContainerRef.current,
        waveColor: '#9ca3af',
        progressColor: '#92C7CF',
        height: height,
        interact: false,
        // Bar look
        barWidth: 5,
        barRadius: 4,
        barGap: 3,
      });
    }

    // wavesurferRef.current?.load(url);

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  // I'm using separate `useEffect` for finish event listener so that it will be
  // updated on updates of the `onFinish` callback
  useEffect(() => {
    const finishUnsub = wavesurferRef.current?.on('finish', () => {
      setAudioPlayed(false);
      onFinish?.();
    });

    return () => finishUnsub?.();
  }, [onFinish]);

  useEffect(() => {
    wavesurferRef.current?.load(url);
  }, [url]);

  const handlePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.play();
      setAudioPlayed(true);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <span className="px-4 text-xl font-bold mb-8">
        Question {trackIndex + 1}
      </span>
      <div
        ref={wavesurferContainerRef}
        style={{ height: height }}
        className="w-full mb-8"
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
