import { BsQuestionLg } from 'react-icons/bs';
import { MicButton } from '../components/MicButton';
import { TitleRow } from '../components/TestComponents';
import { /* useEffect */ useState } from 'react';
import { Modal } from '../components/Modal';
import { useMicRecorder } from '../components/useMicRecorder';
import WaveSurferPlayer from '../components/ListeningAudioPlayer';
// import {
//   generateFileName,
//   submitAudioFile,
// } from '../utilities/speakingUtilitis';

export const SpeakingAudioPage = () => {
  const partIndex = 0;
  const parts = ['', '', ''];

  const [helpIsOpen, setHelpIsOpen] = useState(false);

  /* Bar */
  const linkStyling =
    'px-3 lg:px-5 transition -colors duration-200 flex items-center leading-normal ';
  const barContent = (
    <div className="flex flex-1 h-full font-montserrat text-sm font-bold text-white">
      <button
        className={linkStyling + ' hover-darken'}
        onClick={() => setHelpIsOpen(true)}
      >
        <span>Help</span>
        <BsQuestionLg className="inline ml-2" size={16} />
      </button>
      <span className={linkStyling + ' mr-auto'}>00:10</span>
      {parts.map((_, i) => (
        <button
          className={
            linkStyling + (i === partIndex ? 'bg-black bg-opacity-40' : '')
          }
          key={i}
        >
          Part {i + 1}
        </button>
      ))}
    </div>
  );

  const titleRow = <TitleRow title="Speaking" />;

  const urls = [
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
  ];

  const waveform = <WaveSurferPlayer urls={urls} height={50} />;

  const { isRecording, startRecording, stopRecording } = useMicRecorder();

  //const [audioFileNames, setAudioFileNames] = useState<string[]>([]);

  // useEffect(() => {
  //   if (audioBlob !== undefined) {
  //     const audio = generateFileName();
  //     setAudioFileNames();
  //     submitAudioFile(audio, audioBlob);
  //   }
  // }, [audioBlob]);

  const pageBody = (
    <div className="flex flex-col h-full justify-evenly items-center px-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-backdrop py-4 px-6">
        {waveform}
      </div>
      <MicButton
        className="shadow-backdrop"
        onStop={stopRecording}
        onStart={startRecording}
        isRecording={isRecording}
      />
    </div>
  );

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className="h-[82svh] lg:h-[80svh] w-screen">{pageBody}</div>
      <Modal
        isOpen={helpIsOpen}
        modalMessage="This is help"
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
};
