import { useEffect, useRef, useState } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { ProgressBar } from './ProgressBar';

/** Audio bar for playing listening parts
 *
 * This component is also responsible for fetching and playing the audio
 */
export const ListeningAudioPlayer = ({ urls }: { urls: string[] }) => {
  // const {} = useAudioPlayer();
  const [trackIndex, setTrackIndex] = useState(0);

  const audioPlayer = useGlobalAudioPlayer();
  const pos = useAudioTime(audioPlayer.getPosition);

  useEffect(() => {
    audioPlayer.load(urls[trackIndex], {
      onload: () => {
        setTimeout(() => audioPlayer.play(), 3000);
      },
      onend: () => {
        if (trackIndex < urls.length - 1) {
          setTrackIndex(trackIndex + 1);
        }
      },
    });
  }, [trackIndex]);
  // useEffect(() => {
  //   audioPlayer.load(urls[trackIndex], {
  //     autoplay: true,
  //     onend: () => setTrackIndex(trackIndex + 1),
  //   });
  //   return cleanup;
  // }, [trackIndex, load]);

  return (
    <div className="h-full w-full flex flex-row items-center px-4">
      <span className="px-4" onClick={() => audioPlayer.seek(1000)}>
        Part {trackIndex + 1}
      </span>
      <div className="flex-grow px-4">
        <ProgressBar percentage={pos / audioPlayer.duration} />
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <span>Part {trackIndex + 1} | </span>
  //     <span>
  //       pos: {pos}, dur: {audioPlayer.duration}, percentage:{' '}
  //       {pos / audioPlayer.duration}
  //     </span>
  //   </div>
  // );
};

/* Adapted from "Recipe: Syncing React state to live audio position"
 * see https://www.npmjs.com/package/react-use-audio-player
 */
function useAudioTime(getPosition: () => number) {
  const frameRef = useRef<number>();
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const animate = () => {
      setPos(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [getPosition]);

  return pos;
}
