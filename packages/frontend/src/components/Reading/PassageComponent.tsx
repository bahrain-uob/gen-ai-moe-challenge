import { ReadingPart } from '../../utilities/readingUtilities'; // Adjust the import path as necessary

export const PassageComponent = ({
  readingPart,
  PartIndex,
}: {
  readingPart: ReadingPart;
  PartIndex: number;
}) => {
  return (
    <div>
      <h1 className="text-2xl text-blue-4  mb-7">Part {PartIndex}</h1>
      <h1 className='text-2xl text-blue-4 font-bold mb-7'>{readingPart.PassageTitle}</h1>
      <p style={{ whiteSpace: 'pre-line' }} className='text-justify'>{readingPart.Passage}</p>
    </div>
  );
};
