import { Challenge } from './planTypes';

export const sampleChallenge: Challenge = {
  context: 'Here should be a context paragraph', // I added this and moved the audio file to contextAudio
  contextAudio: 'readingChallengeB2-1.mp3',
  tasks: [
    {
      // Here was a Question[] and the question is inside it but I changed it to LRQuestion immediately (need confirmation from Sayed)
      NumOfSubQuestions: 6,
      Question: 'Choose the correct answer, A, B or C.',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: [
            "A- didn't start the company but manages it now.",
            'B- started the company and manages it now.',
            "C- tarted the company but doesn't manage it any more.",
          ],
          CorrectAnswer: 'B- started the company and manages it now.',
          QuestionText: ' Anna ... ',
        },
        {
          Choices: [
            'A- is for parents to learn from.',
            'B- is for students to learn from.',
            'C- is for students who want to find a tutor.',
          ],
          CorrectAnswer: 'C- is for students who want to find a tutor.',
          QuestionText: 'The app ...',
        },
        {
          Choices: [
            "A- don't have the time or knowledge to help with their children's homework.",
            "B- think that schools should help with their children's homework.",
            "C- don't want to help with their children's homework.",
          ],
          CorrectAnswer:
            "A- don't have the time or knowledge to help with their children's homework.",
          QuestionText: ' Many parents ... ',
        },
        {
          Choices: [
            'A- has student exercises on it.',
            'B- is only for people in remote areas.',
            'C-  offers live online support from tutors.',
          ],
          CorrectAnswer: 'C-  offers live online support from tutors.',
          QuestionText: 'The app ...',
        },
        {
          Choices: [
            'A- often charge lower rates.',
            'B-  often charge higher rates.',
            "C- don't like to work too much.",
          ],
          CorrectAnswer: 'A- often charge lower rates.',
          QuestionText: ' On the app, tutors who live in remote areas ... ',
        },
        {
          Choices: [
            'A- is new and not many people know about it.',
            'B- is already popular.',
            'C- is not very successful.',
          ],
          CorrectAnswer: 'B- is already popular.',
          QuestionText: 'The app ...',
        },
      ],
    },

    {
      List: 'A a problem\nB a need\nC itself\nD the range of services\nE an idea\nF funding',
      ListTitle: 'List of nouns:',
      NumOfSubQuestions: 6,
      Question: 'Match the verbs and nouns from the interview.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'A',
          QuestionText: 'to solve -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'E',
          QuestionText: ' to come up with -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'B',
          QuestionText: 'to meet -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'C',
          QuestionText: 'to speak for -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'F',
          QuestionText: 'to secure -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'D',
          QuestionText: 'to expand -answer-',
        },
      ],
    },
  ],
};
