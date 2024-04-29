import '../css_files/Exam.css';

interface ListeningExamPartsProps {
  partNum: string; // Correctly declare partNum as a string
}

export default function ListeningExamParts({
  partNum,
}: ListeningExamPartsProps) {
  const partContent: { [key: string]: string } = {
    part1: 'Content for Part 1',
    part2: 'Content for Part 2',
    part3: 'Content for Part 3',
    part4: 'Content for Part 4',
  };

  return (
    <div className="Listening-Questions-Part">
      <div>
        <h1>{partNum}</h1>
      </div>
      <div>
        <p>{partContent[partNum]} </p>
      </div>
    </div>
  );
}
