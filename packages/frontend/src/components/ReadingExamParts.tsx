import React from 'react';

interface Props {
  partNum: string; // Change 'string' to string
}

const ReadingExamParts: React.FC<Props> = ({ partNum }) => {
  const partContent: {
    [key: string]: { title: string; passage: string; questions: string };
  } = {
    part1: {
      title: 'The Benefits of Reading',
      passage: ` Reading is one of the most enriching activities one can engage in.
      Whether it's fiction, non-fiction, poetry, or any other form of
      literature, reading offers numerous benefits for the mind, body, and
      soul. Reading stimulates the brain and improves cognitive function.
      It enhances vocabulary, comprehension, and critical thinking skills.
      When we read, our brains are actively processing information, making
      connections, and expanding our understanding of the world. Moreover,
      reading can be a form of escapism. It transports us to different
      times, places, and realities, allowing us to experience adventures,
      emotions, and perspectives beyond our own. This escapism can provide
      relief from stress, anxiety, and the pressures of everyday life.
      Additionally, reading fosters empathy and emotional intelligence.
      Through literature, we can step into the shoes of characters from
      diverse backgrounds, cultures, and experiences, gaining insight into
      their lives and emotions. This empathy helps us relate to others
      better and navigate social interactions with greater understanding
      and compassion. Furthermore, reading has been linked to improved
      mental health. It can reduce symptoms of depression and anxiety,
      promote relaxation, and enhance overall well-being. Whether it's
      through self-help books, inspirational stories, or simply losing
      ourselves in a captivating narrative, reading has the power to
      uplift and inspire. In conclusion, the benefits of reading are vast
      and profound. It enriches our minds, broadens our horizons, and
      nourishes our souls. So pick up a book, delve into its pages, and
      discover the transformative power of reading for yourself.
`,
      questions: `1- What is one benefit of reading mentioned in the passage? A)
                  Improved physical fitness B) Enhanced cognitive function C)
                  Decreased social interaction D) Worsened mental health 
                  2- How does reading stimulate the brain? A) By inducing sleepiness
                  B) By reducing brain activity C) By challenging cognitive abilities
                  D) By causing boredom`,
    },
    part2: {
      title: 'Part 2',
      passage: `Content for Part 2. 
                This is the big paragraph for Part 2. 
                It contains information relevant to Part 2.`,
      questions: `1- What is one benefit of reading mentioned in the passage? A)
                  Improved creativity B) Enhanced memory C)
                  Decreased stress D) Worsened vision 
                  2- How does reading improve vocabulary? A) By avoiding difficult words
                  B) By using simple language C) By exposure to new words
                  D) By skipping unfamiliar terms`,
    },
    part3: {
      title: 'Part 3',
      passage: `Content for Part 3. 
                This is the big paragraph for Part 3. 
                It contains information relevant to Part 3.`,
      questions: `1- What is one benefit of reading mentioned in the passage? A)
                  Improved empathy B) Enhanced physical strength C)
                  Decreased happiness D) Worsened relationships 
                  2- How does reading foster empathy? A) By avoiding emotional stories
                  B) By isolating readers from characters C) By providing unrealistic scenarios
                  D) By allowing readers to understand different perspectives`,
    },
    part4: {
      title: 'Part 4',
      passage: `Content for Part 4. 
                This is the big paragraph for Part 4. 
                It contains information relevant to Part 4.`,
      questions: `1- What is one benefit of reading mentioned in the passage? A)
                  Improved focus B) Enhanced appetite C)
                  Decreased imagination D) Worsened memory 
                  2- How does reading improve focus? A) By providing distractions
                  B) By requiring sustained attention C) By encouraging multitasking
                  D) By promoting daydreaming`,
    },
  };

  return (
    <>
      {partNum && (
        <div className="Reading-Part">
          <div className="passage-content">
            <h1 className="passage-title">{partContent[partNum].title}</h1>
            <p className="passage">{partContent[partNum].passage}</p>
          </div>
        </div>
      )}

      {partNum && (
        <div className="Reading-Questions-Part">
          <p>{partContent[partNum].questions}</p>
        </div>
      )}
    </>
  );
};

export default ReadingExamParts;
