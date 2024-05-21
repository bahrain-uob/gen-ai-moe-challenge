import { ReadingPart } from '../../utilities/LRUtilities'; // Adjust the import path as necessary

export const PassageComponent = ({
  readingPart,
  PartIndex,
}: {
  readingPart: ReadingPart;
  PartIndex: number;
}) => {
  return (
    <div>
      <h1 className="font-bold text-xl">Part {PartIndex + 1}</h1>
      <h1 className="my-4 text-xl">{readingPart.PassageTitle}</h1>
      <p style={{ whiteSpace: 'pre-line' }} className='text-justify'>{readingPart.Passage}</p>
    </div>
  );
};
