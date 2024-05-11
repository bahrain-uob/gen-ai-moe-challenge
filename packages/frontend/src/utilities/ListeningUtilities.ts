import {
  QuestionTableCompletion,
  QuestionListSelection,
  QuestionMultipleChoice,
  QuestionSummaryCompletion,
  QuestionMultipleAnswers,
  QuestionDiagramCompletion,
} from './readingUtilities';

export interface ListeningPart {
  MyPartitionKey: string;
  MySortKey: string;
  NumOfQuestions: number;
  ScriptKey: string;
  Questions: ListeningQuestion[];
}
export type ListeningQuestion =
  | QuestionTableCompletion
  | QuestionListSelection
  | QuestionMultipleChoice
  | QuestionSummaryCompletion
  | QuestionMultipleAnswers
  | QuestionDiagramCompletion;

export const ListeningParts: ListeningPart[] = [
  {
    MyPartitionKey: 'ListeningP1',
    MySortKey: '1',
    NumOfQuestions: 1,
    Questions: [
      {
        NumOfSubQuestions: 6,
        Question: 'Write ONE WORD AND/OR A NUMBER for each answer.',
        QuestionType: 'Short Answers',
        SubQuestions: [
          {
            CorrectAnswers: [['hostel']],
            QuestionText:
              'Currently residing in a -answer- throughout the week',
            QuestionWeight: 1,
          },
          {
            CorrectAnswers: [['Buckleigh']],
            QuestionText:
              'Postal address: 17, -answer- Street, Stamford, Lincs',
            QuestionWeight: 1,
          },
          {
            CorrectAnswers: [['PE9 7QT']],
            QuestionText: 'Postcode: -answer-',
            QuestionWeight: 1,
          },
          {
            CorrectAnswers: [['waiter'], ['politics']],
            QuestionText:
              'Occupation: student and part-time job as a -answer-. Pursuing -answer- (major subject) and history (minor subject)',
            QuestionWeight: 2,
          },
          {
            CorrectAnswers: [
              ['cycling'],
              ['cinema'],
              ['disabled'],
              ['4.30 (pm)', 'half past four'],
            ],
            QuestionText:
              'Hobbies: does a lot of -answer-, and is fascinated in the -answer-. On Youth Council, wants to work with youngsters who are -answer- Will come to talk to the Elections Officer next Monday at -answer- pm',
            QuestionWeight: 4,
          },
          {
            CorrectAnswers: [['07788 136711']],
            QuestionText: 'Phone number: -answer-',
            QuestionWeight: 1,
          },
        ],
      },
    ],
    ScriptKey: '-',
  },
  {
    MyPartitionKey: 'ListeningP2',
    MySortKey: '1',
    NumOfQuestions: 2,
    Questions: [
      {
        NumOfSubQuestions: 3,
        Question: 'Choose TWO letters, A-E.',
        QuestionType: 'Multiple Answers',
        SubQuestions: [
          {
            Choices: [
              'A- Few rooms now have a different purpose of use.',
              'B- A different kind of seating arrangement has been installed.',
              'C- A lift has been installed',
              'D- The exterior of the building has been mended.',
              'E-  Extra seats have been put on.',
            ],
            CorrectAnswers: [
              ['A', 'B'],
              ['A', 'B'],
            ],
            QuestionText:
              'Which TWO alterations have been made so far during the restoration of the theatre?',
            QuestionWeight: 2,
          },
          {
            Choices: [
              'A- rooms for hire',
              'B- backstage tours',
              'C- hire of costumes',
              'D- a bookshop',
              'E-  a café',
            ],
            CorrectAnswers: [
              ['D', 'B'],
              ['D', 'B'],
            ],
            QuestionText:
              'Which TWO amenities does the theatre currently offer to the citizens?',
            QuestionWeight: 2,
          },
          {
            Choices: [
              'A- sound',
              'B- acting',
              'C- making puppets',
              'D- make-up',
              'E- lighting',
            ],
            CorrectAnswers: [
              ['C', 'E'],
              ['C', 'E'],
            ],
            QuestionText:
              'Which TWO workshops does the theatre currently offer?',
            QuestionWeight: 2,
          },
        ],
      },
      {
        Diagram: '-',
        NumOfSubQuestions: 4,
        Question: 'Write the correct letter, A-G next to the questions.',
        QuestionType: 'Diagram Completion',
        SubQuestions: [
          {
            CorrectAnswers: [['G']],
            QuestionText: 'box office -answer-',
            QuestionWeight: 1,
          },
          {
            CorrectAnswers: [['D']],
            QuestionText: "theatre manager's office -answer-",
            QuestionWeight: 1,
          },
          {
            CorrectAnswers: [['B']],
            QuestionText: 'lighting box -answer-',
            QuestionWeight: 1,
          },
          {
            CorrectAnswers: [['F']],
            QuestionText: "artistic director's offices -answer-",
            QuestionWeight: 1,
          },
        ],
      },
    ],
    ScriptKey: '-',
  },
  {
    MyPartitionKey: 'ListeningP3',
    MySortKey: '1',
    NumOfQuestions: 2,
    Questions: [
      {
        NumOfSubQuestions: 6,
        Question: 'Choose the correct letter, A, B or C.',
        QuestionType: 'Multiple Choice',
        SubQuestions: [
          {
            Choices: [
              'A- elements affecting where beings live',
              'B- the requirements to conserve species at risk',
              'C- techniques for ranking different organisms',
            ],
            CorrectAnswer: 'A',
            QuestionText:
              'What are the students consent which should be included in their aims?',
          },
          {
            Choices: ['A- string', 'B- a compass', 'C- a ruler'],
            CorrectAnswer: 'A',
            QuestionText:
              'What tools did they not remember to take on the Field Trip?',
          },
          {
            Choices: [
              'A- the sequence in which data is given.',
              'B- the way the information is bifurcated.',
              'C- the amount of information given.',
            ],
            CorrectAnswer: 'C',
            QuestionText: 'In Helen’s section, Colin suggests a change in',
          },
          {
            Choices: [
              'A- It provided precise results.',
              'B- It was easy to carry out.',
              'C-  It required special equipment.',
            ],
            CorrectAnswer: 'B',
            QuestionText:
              'What do they say about the technique they used to measure wave speed?',
          },
          {
            Choices: [
              'A- She chose the incorrect scale.',
              'B-  She stood in the wrong place.',
              'C- She did it at the wrong time.',
            ],
            CorrectAnswer: 'B',
            QuestionText:
              'What error did Helen make when first drawing the map?',
          },
          {
            Choices: [
              'A- scan it onto a computer',
              'B- check it using photographs',
              'C- add information from the internet',
            ],
            CorrectAnswer: 'B',
            QuestionText: 'What do they decide to do next with their map?',
          },
        ],
      },
      {
        NumOfSubQuestions: 2,
        Question: 'Choose TWO letters, A-E.',
        QuestionType: 'Multiple Answers',
        SubQuestions: [
          {
            Choices: [
              'A- lack of water',
              'B- strong winds',
              'C- lack of food',
              'D- high temperatures',
              'E- large waves',
            ],
            CorrectAnswers: [
              ['A', 'D'],
              ['A', 'D'],
            ],
            QuestionText:
              'Which TWO problems affecting organisms in the splash zone are mentioned?',
            QuestionWeight: 2,
          },
          {
            Choices: [
              'A- imprecise records of the habitat of organisms',
              'B- impact on behaviour of organisms by observer',
              'C- wrong identification of few organisms',
              'D- making generalisations from a small sample',
              'E- missing some organisms when calculating',
            ],
            CorrectAnswers: [
              ['C', 'E'],
              ['C', 'E'],
            ],
            QuestionText:
              'Which TWO reasons for possible error will they include in their report?',
            QuestionWeight: 2,
          },
        ],
      },
    ],
    ScriptKey: '-',
  },
  {
    MyPartitionKey: 'ListeningP4',
    MySortKey: '1',
    NumOfQuestions: 1,
    Questions: [
      {
        NumOfSubQuestions: 5,
        Question:
          'Complete the notes below.\n\nWrite ONE WORD ONLY for each answer',
        QuestionType: 'Short Answers',
        SubQuestions: [
          {
            CorrectAnswers: [['social']],
            QuestionText:
              'The designer of a public building may need to think about the building’s: \n\n-function\n\n-physical and -answer- context\n\n-symbolic meaning',
            QuestionWeight: 1,
          },
          {
            CorrectAnswers: [['factory'], ['canal']],
            QuestionText:
              'Location and concept of the Concert Hall:\n\nOn the site of an unused -answer-\nNext to a -answer-\nThe design is based on the idea of a enigma',
            QuestionWeight: 2,
          },
          {
            CorrectAnswers: [['bridge'], ['box'], ['screen']],
            QuestionText:
              'Building design:\n\nIt’s approached by a -answer- for walkers.\nThe building is the shape of a -answer-.\nOne exterior wall functions as a large -answer-',
            QuestionWeight: 3,
          },
          {
            CorrectAnswers: [['rubber'], ['curved'], ['curtains']],
            QuestionText:
              'In the auditorium:\n\n-the floor is built on massive pads made of -answer-\n-the walls are made of local wood and are -answer- in shape\n-ceiling panels and -answer- on walls allow adjustment of acoustics',
            QuestionWeight: 3,
          },
          {
            CorrectAnswers: [['international']],
            QuestionText:
              'Evaluation:\n\nSome critics say the -answer- style of the building is unsuitable',
            QuestionWeight: 1,
          },
        ],
      },
    ],
    ScriptKey: '-',
  },
];
