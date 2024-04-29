import '../css_files/Exam.css';
import FooterButton from './FooterButton';

export default function ExamFooter({
  onPartSelect,
  partNum,
}: {
  onPartSelect: (part: string) => void;
  partNum: string;
}) {
  console.log('hi');
  console.log(partNum);
  return (
    <div className="exam-Footer">
      <div className="spacer"></div>

      <FooterButton
        onSelectPart={onPartSelect}
        location="part1"
        name="part 1"
        partNum={partNum}
      />
      <FooterButton
        onSelectPart={onPartSelect}
        location="part2"
        name="part 2"
        partNum={partNum}
      />

      <FooterButton
        onSelectPart={onPartSelect}
        location="part3"
        name="part 3"
        partNum={partNum}
      />
      <FooterButton
        onSelectPart={onPartSelect}
        location="part4"
        name="part 4"
        partNum={partNum}
      />
    </div>
  );
}
