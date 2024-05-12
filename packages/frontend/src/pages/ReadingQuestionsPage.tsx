import React from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { readingParts } from '../utilities/readingUtilities';
import { PassageComponent } from '../components/Reading/PassageComponent';
import { QuestionsComponent } from '../components/Reading/QuestionsComponent';

const ReadingQuestions = () => {
  // const { section, sk } = useParams();

  const x = readingParts.map((part, index) => (
    <React.Fragment key={index}>
      <PassageComponent readingPart={part} PartIndex={1} />
      <QuestionsComponent questions={part.Questions} />
    </React.Fragment>
  ));

  return x;
};

export default ReadingQuestions;
