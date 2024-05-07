import { Question } from './PlacementTest';

export const sections: Question[][] = [
  // Section 1
  [
    {
      text: '________ did you do today?',
      sub: '',
      options: [
        { id: 0, text: 'What', isCorrect: true },
        { id: 1, text: 'Who', isCorrect: false },
        { id: 2, text: 'Where', isCorrect: false },
        { id: 3, text: 'When', isCorrect: false },
      ],
    },
    {
      text: 'She ________ a doctor.',
      sub: '',
      options: [
        { id: 0, text: 'are', isCorrect: false },
        { id: 1, text: 'am', isCorrect: false },
        { id: 2, text: 'is', isCorrect: true },
        { id: 3, text: 'were', isCorrect: false },
      ],
    },
    {
      text: 'We ________ basketball every day.',
      sub: '',
      options: [
        { id: 0, text: 'plays', isCorrect: false },
        { id: 1, text: 'play', isCorrect: true },
        { id: 2, text: 'playing', isCorrect: false },
        { id: 3, text: 'players', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is correct?',
      sub: '',
      options: [
        { id: 0, text: 'Jerry can’t cook well.', isCorrect: true },
        { id: 1, text: 'Jerry cook can’t well.', isCorrect: false },
        { id: 2, text: 'Can’t Jerry cook well.', isCorrect: false },
        { id: 3, text: 'Jerry can’t well cook.', isCorrect: false },
      ],
    },
    {
      text: 'How ________ does the book cost?',
      sub: '',
      options: [
        { id: 0, text: 'many', isCorrect: false },
        { id: 1, text: 'money', isCorrect: false },
        { id: 2, text: 'pay', isCorrect: false },
        { id: 3, text: 'much', isCorrect: true },
      ],
    },
    {
      text: 'It is ________ today. There is no sun.',
      sub: '',
      options: [
        { id: 0, text: 'rain', isCorrect: false },
        { id: 1, text: 'rains', isCorrect: false },
        { id: 2, text: 'rainy', isCorrect: true },
        { id: 3, text: 'rainings', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is correct?',
      sub: '',
      options: [
        { id: 0, text: 'Mum is right now at the shops.', isCorrect: false },
        { id: 1, text: 'Mum at the shops is right now.', isCorrect: false },
        { id: 2, text: 'Right now at the shops is Mum.', isCorrect: false },
        { id: 3, text: 'Mum is at the shops right now.', isCorrect: true },
      ],
    },
  ],
  // Section 2
  [
    {
      text: 'They ________ ________ with Jackson in the conference room.',
      sub: '',
      options: [
        { id: 0, text: 'are met', isCorrect: false },
        { id: 1, text: 'were meet', isCorrect: false },
        { id: 2, text: 'are meeting', isCorrect: true },
        { id: 3, text: 'are meet', isCorrect: false },
      ],
    },
    {
      text: 'Where will the picnic take place?',
      sub: 'Picnic this Saturday in Green Forest Park \n Time: 3:00 - 6:00pm \nDon’t miss the: \n-fireworks \n-live music \n-delicious food',
      options: [
        { id: 0, text: 'live music', isCorrect: false },
        { id: 1, text: '3:00 - 6:00pm', isCorrect: false },
        { id: 2, text: 'Green Forest Park', isCorrect: true },
        { id: 3, text: 'Saturday', isCorrect: false },
      ],
    },
    {
      text: 'Which word is correct in all three sentences?',
      sub: 'Picnic this Saturday in Green Forest Park \n Time: 3:00 - 6:00pm \nDon’t miss the: \n-fireworks \n-live music \n-delicious food',
      options: [
        { id: 0, text: 'get', isCorrect: true },
        { id: 1, text: 'go', isCorrect: false },
        { id: 2, text: 'live', isCorrect: false },
        { id: 3, text: 'find', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is NOT correct?',
      sub: '',
      options: [
        { id: 0, text: 'They are working quickly today.', isCorrect: false },
        { id: 1, text: 'Sophia drove slowly to work.', isCorrect: false },
        { id: 2, text: 'You are singing happily.', isCorrect: false },
        { id: 3, text: 'He fell hardly to the ground.', isCorrect: true },
      ],
    },
    {
      text: 'Harry ________ sleeping when his boss called.',
      sub: '',
      options: [
        { id: 0, text: 'were', isCorrect: false },
        { id: 1, text: 'was', isCorrect: true },
        { id: 2, text: 'is', isCorrect: false },
        { id: 3, text: "isn't", isCorrect: false },
      ],
    },
    {
      text: 'Did you go to the store? There isn’t _________ cereal left.',
      sub: '',
      options: [
        { id: 0, text: 'some', isCorrect: false },
        { id: 1, text: 'many', isCorrect: false },
        { id: 2, text: 'alot', isCorrect: false },
        { id: 3, text: 'much', isCorrect: true },
      ],
    },
    {
      text: 'If you forget to bring your lunch, _______________.',
      sub: '',
      options: [
        { id: 0, text: 'you are hungry', isCorrect: false },
        { id: 1, text: "you wouldn't eat", isCorrect: false },
        { id: 2, text: 'you will be hungry', isCorrect: true },
        { id: 3, text: 'you shouldn’t eat', isCorrect: false },
      ],
    },
  ],
  // Section 3
  [
    {
      text: 'Which sentence is NOT correct?',
      sub: '',
      options: [
        {
          id: 0,
          text: 'Neither Ben or Candice still live there.',
          isCorrect: true,
        },
        {
          id: 1,
          text: 'She can’t paint, and neither can I.',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'Either we buy some food, or we need to order in.',
          isCorrect: false,
        },
        { id: 3, text: 'We are going to lose either way.', isCorrect: false },
      ],
    },
    {
      text: 'If the clients ________ unhappy, everyone ________ unhappy.',
      sub: '',
      options: [
        { id: 0, text: 'are/be', isCorrect: false },
        { id: 1, text: 'be/are', isCorrect: false },
        { id: 2, text: 'are/is', isCorrect: true },
        { id: 3, text: 'is/are', isCorrect: false },
      ],
    },
    {
      text: 'As I just lost my job, I can’t ________ any fancy holidays, but I would love to go to Australia. ',
      sub: '',
      options: [
        { id: 0, text: 'afford', isCorrect: true },
        { id: 1, text: 'buy', isCorrect: false },
        { id: 2, text: 'offer', isCorrect: false },
        { id: 3, text: 'affair', isCorrect: false },
      ],
    },
    {
      text: 'How long ________ you ________ (have) this fancy new TV?',
      sub: '',
      options: [
        { id: 0, text: 'have/had', isCorrect: true },
        { id: 1, text: 'had/had', isCorrect: false },
        { id: 2, text: 'have/has', isCorrect: false },
        { id: 3, text: 'do/have', isCorrect: false },
      ],
    },
    {
      text: 'Complete the sentence.',
      sub: 'Her phone isn’t in her purse; it ......',
      options: [
        { id: 0, text: 'mustn’t be in her car', isCorrect: false },
        { id: 1, text: 'must be in her car', isCorrect: true },
        { id: 2, text: 'mightn’t be in her car', isCorrect: false },
        { id: 3, text: 'ought in her car', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is correct?',
      sub: '',
      options: [
        { id: 0, text: 'Let’s go to the cafe in 12:00pm.', isCorrect: false },
        { id: 1, text: 'At June, we will be in Germany.', isCorrect: false },
        {
          id: 2,
          text: 'Can you pick up the clothes at Saturday?',
          isCorrect: false,
        },
        { id: 3, text: 'She will come to visit at Easter.', isCorrect: true },
      ],
    },
    {
      text: 'The pizza ________ _______ when I took it out of the oven.',
      sub: '',
      options: [
        { id: 0, text: 'has burnt', isCorrect: false },
        { id: 1, text: 'was burnt', isCorrect: true },
        { id: 2, text: 'was burn', isCorrect: false },
        { id: 3, text: 'was burns', isCorrect: false },
      ],
    },
  ],
  // Section 4
  [
    {
      text: 'They ________ to go to the beach every winter when they lived in Canada.',
      sub: '',
      options: [
        { id: 0, text: 'were used', isCorrect: false },
        { id: 1, text: 'used', isCorrect: true },
        { id: 2, text: 'had used', isCorrect: false },
        { id: 3, text: 'got used', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence correctly uses the Future Perfect Continuous Tense?',
      sub: '',
      options: [
        {
          id: 0,
          text: 'I will have been living in London for a year come June.',
          isCorrect: true,
        },
        { id: 1, text: 'She has been studying French.', isCorrect: false },
        {
          id: 2,
          text: 'We will look for a new venue for our wedding.',
          isCorrect: false,
        },
        {
          id: 3,
          text: 'They had been sleeping before the alarm went off.',
          isCorrect: false,
        },
      ],
    },
    {
      text: 'She got a new table ________ is quite a bit smaller than the last one.',
      sub: '',
      options: [
        { id: 0, text: 'who', isCorrect: false },
        { id: 1, text: 'that', isCorrect: false },
        { id: 2, text: 'so', isCorrect: false },
        { id: 3, text: 'which', isCorrect: true },
      ],
    },
    {
      text: 'I hope I ________ go to the museum with you next week. I’ll check my schedule.',
      sub: '',
      options: [
        { id: 0, text: 'can', isCorrect: true },
        { id: 1, text: 'could', isCorrect: false },
        { id: 2, text: 'will', isCorrect: false },
        { id: 3, text: 'would', isCorrect: false },
      ],
    },
    {
      text: 'Choose the best sentence based on the information below.',
      sub: '',
      options: [
        {
          id: 0,
          text: 'If Brenda hadn’t set her alarm, she would have made it to the meeting.',
          isCorrect: false,
        },
        {
          id: 1,
          text: 'If the meeting were later, Brenda would have made it.',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'If Brenda had set her alarm, she would have made it to the meeting.',
          isCorrect: true,
        },
        {
          id: 3,
          text: 'If Brenda had set her alarm, she would have missed the meeting.',
          isCorrect: false,
        },
      ],
    },
    {
      text: 'Which words do NOT complete the sentence? The party was delayed ________ ________ the thunderstorm that blew in. ',
      sub: '',
      options: [
        { id: 0, text: 'due to', isCorrect: false },
        { id: 1, text: 'because of', isCorrect: false },
        { id: 2, text: 'owing to', isCorrect: false },
        { id: 3, text: 'account on', isCorrect: true },
      ],
    },
    {
      text: 'Which prefix can be added to both expected and important in the following sentence?',
      sub: 'The car crash was (expected), but the cause (important).',
      options: [
        { id: 0, text: 'il-', isCorrect: false },
        { id: 1, text: 'un-', isCorrect: true },
        { id: 2, text: 'in-', isCorrect: false },
        { id: 3, text: 'pre-', isCorrect: false },
      ],
    },
  ],
  // Section 5
  [
    {
      text: 'The Chinese economy is rapidly growing and continues to _________ year after year.',
      sub: '',
      options: [
        { id: 0, text: 'accentuate', isCorrect: false },
        { id: 1, text: 'articulate', isCorrect: false },
        { id: 2, text: 'accelerate', isCorrect: true },
        { id: 3, text: 'predicate', isCorrect: false },
      ],
    },
    {
      text: 'Which word is incorrect in the following sentence?',
      sub: 'The formulation of new prescriptions drugs has had a profound effect on the overall health of developing nations.',
      options: [
        { id: 0, text: 'formulation', isCorrect: false },
        { id: 1, text: 'prescriptions', isCorrect: true },
        { id: 2, text: 'has', isCorrect: false },
        { id: 3, text: 'developing', isCorrect: false },
      ],
    },
    {
      text: 'Which word(s) best replaces the (Word Inside) of the sentence',
      sub: 'His new book was truly (eye opening) for me as I never learnt this information in school.',
      options: [
        { id: 0, text: 'eyeopening', isCorrect: false },
        { id: 1, text: 'eye-opening', isCorrect: true },
        { id: 2, text: 'eyes opening', isCorrect: false },
        { id: 3, text: 'correct as is', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is in the third conditional?',
      sub: '',
      options: [
        { id: 0, text: 'If I study, I will pass my exam.', isCorrect: false },
        {
          id: 1,
          text: 'If you put an ice cube outside, it melts.',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'If I bought apples, I would make an apple pie.',
          isCorrect: false,
        },
        {
          id: 3,
          text: 'If I had packed my bag last night, I wouldn’t have forgotten my toothbrush.',
          isCorrect: true,
        },
      ],
    },
    {
      text: 'It was difficult for Lola to ________ ________ after she lost three clients in the same week.?',
      sub: '',
      options: [
        { id: 0, text: 'bounce back', isCorrect: true },
        { id: 1, text: 'get back', isCorrect: false },
        { id: 2, text: 'bounce again', isCorrect: false },
        { id: 3, text: 'bounce around', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence demonstrates an inversion with a negative adverbial correctly?',
      sub: '',
      options: [
        { id: 0, text: 'I am in no way related to her.', isCorrect: false },
        {
          id: 1,
          text: 'In no way is that going to be left on the table.',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'Only do I understand now what happened.',
          isCorrect: false,
        },
        { id: 3, text: 'Not once did he stop to chat.', isCorrect: true },
      ],
    },
    {
      text: 'Which synonym can we use to replace the (Word Inside)?',
      sub: 'The story was so wildly (over the top), and no one at the conference believed it for a second.',
      options: [
        { id: 0, text: 'understated', isCorrect: false },
        { id: 1, text: 'dramatize', isCorrect: false },
        { id: 2, text: 'exaggerated', isCorrect: true },
        { id: 3, text: 'speculated', isCorrect: false },
      ],
    },
  ],
  // Section 6
  [
    {
      text: 'I was at a disadvantage _______ that I didn’t know what software the rest of the team would be using. ',
      sub: '',
      options: [
        { id: 0, text: 'at', isCorrect: false },
        { id: 1, text: 'by', isCorrect: false },
        { id: 2, text: 'in', isCorrect: true },
        { id: 3, text: 'for', isCorrect: false },
      ],
    },
    {
      text: '_______ you to change your flight, we would be happy to pick you up from the airport.',
      sub: '',
      options: [
        { id: 0, text: 'Should', isCorrect: false },
        { id: 1, text: 'Were', isCorrect: true },
        { id: 2, text: 'If', isCorrect: false },
        { id: 3, text: 'Since', isCorrect: false },
      ],
    },
    {
      text: 'What is the meaning of the (rounded) word in the following sentence?',
      sub: 'They (swindled) their investors out of millions of dollars before they were caught.',
      options: [
        { id: 0, text: 'to invest', isCorrect: false },
        { id: 1, text: 'to cheat', isCorrect: true },
        { id: 2, text: 'to encourage', isCorrect: false },
        { id: 3, text: 'to educate', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is written correctly?',
      sub: '',
      options: [
        {
          id: 0,
          text: 'It’s not any more dangerous than climbing a tree.',
          isCorrect: true,
        },
        {
          id: 1,
          text: 'Climbing a tree and that aren’t any more dangerous.',
          isCorrect: false,
        },
        {
          id: 2,
          text: "It and that aren't more dangerous than climbing any tree.",
          isCorrect: false,
        },
        {
          id: 3,
          text: 'Any more dangerous than climbing a tree it isn’t.',
          isCorrect: false,
        },
      ],
    },
    {
      text: "Our new investors' program focuses ________ ________ on integrating new technology. ",
      sub: '',
      options: [
        { id: 0, text: 'entirely almost', isCorrect: false },
        { id: 1, text: 'surely entirely', isCorrect: false },
        { id: 2, text: 'almost entirely', isCorrect: true },
        { id: 3, text: 'nearly almost', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence does NOT contain a cleft clause?',
      sub: '',
      options: [
        {
          id: 0,
          text: 'It’s elected officials we must rely on.',
          isCorrect: false,
        },
        {
          id: 1,
          text: 'The ones that are still present are worth discussing.',
          isCorrect: false,
        },
        {
          id: 2,
          text: 'Where it falls short is in the design.',
          isCorrect: false,
        },
        { id: 3, text: 'How many people did you see?', isCorrect: true },
      ],
    },
    {
      text: 'Which sentence is written correctly?',
      sub: '',
      options: [
        {
          id: 0,
          text: "The guitar was Lily's and her father's before her.",
          isCorrect: true,
        },
        {
          id: 1,
          text: "The guitar was Lily and her fathers' before her.",
          isCorrect: false,
        },
        {
          id: 2,
          text: "The guitar was Lilys' and her father's before her.",
          isCorrect: false,
        },
        {
          id: 3,
          text: "The guitar was Lilys' and her fathers' before her.",
          isCorrect: false,
        },
      ],
    },
  ],
];
