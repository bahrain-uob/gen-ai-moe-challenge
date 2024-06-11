import WaveSurferPlayer from '../components/ListeningAudioPlayer';
import { sampleAudios } from '../utilities/sampleFullTest';

// type SpeakingPart = {
//   Task: {
//     S3key: string;
//     text: number;
//   };
//   Questions: {
//     text: string;
//     S3Key?: string;
//   }[];
// };

export const SpeakingBodyComponent = (
  { speakingPart, partIndex }, //: {
) =>
  //speakingPart: SpeakingPart;
  //partIndex: number;
  //}
  {
    console.log(speakingPart);

    const renderSwitch = (partIndex: number) => {
      switch (partIndex) {
        case 0:
          return SpeakingPart1;
        case 1:
          return SpeakingPart2;
        case 2:
          return SpeakingPart3;
      }
    };

    const waveform = <WaveSurferPlayer urls={sampleAudios} height={200} />;

    const cardContent = (
      <>
        <h3 className="font-light text-lg mb-3 border-b-2">
          {speakingPart.Task.text}
        </h3>
        <ul className="list-inside ml-4">
          {speakingPart.Questions.map((question, index) => (
            <li key={index} className="list-disc mb-1">
              {question}
            </li>
          ))}
        </ul>
      </>
    );

    const pageBody = (element: JSX.Element) => (
      <div className="flex flex-col h-full justify-evenly items-center px-6">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-backdrop py-4 px-6">
          {element}
        </div>
      </div>
    );

    const SpeakingPart1 = (
      <div className="h-[82svh] lg:h-[80svh] w-screen">
        {pageBody(waveform)}
      </div>
    );

    const SpeakingPart2 = (
      <div className="h-[82svh] lg:h-[80svh] w-screen">
        {pageBody(cardContent)}
      </div>
    );

    const SpeakingPart3 = (
      <div className="h-[82svh] lg:h-[80svh] w-screen">
        {pageBody(waveform)}
      </div>
    );

    return <>{renderSwitch(partIndex)}</>;
  };
