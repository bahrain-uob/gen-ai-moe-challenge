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
      <h1>Part {PartIndex}</h1>
      <h1>{readingPart.PassageTitle}</h1>
      <p style={{ whiteSpace: 'pre-line' }}>{readingPart.Passage}</p>
    </div>
  );
};
