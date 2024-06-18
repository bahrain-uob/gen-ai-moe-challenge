import { Challenge } from './planTypes';

export const sampleChallenge: Challenge = {
  contextTitle: 'Transcipt',
  context: 'Here should be a context paragraph', // I added this and moved the audio file to contextAudio
  contextAudio: 'readingChallengeB2-1.mp3',
  type: 'Listening',
  level: 'B2',
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

export const c1: Challenge = {
  context:
    'Listen to the business interview to practise and improve your listening skills.',
  contextAudio: 'listeningChallengeB2-1.mp3',
  tasks: [
    {
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

export const c2: Challenge = {
  context:
    'Listen to the presentation about a new product design to practise and improve your listening skills.',
  contextAudio: 'listeningChallengeB2-2.mp3',
  tasks: [
    {
      NumOfSubQuestions: 6,
      Question: 'Are the sentences true or false?',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: ' They have redesigned an old product. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: ' The product is aimed at men and women aged 18–40. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            " The new design means you don't need two hands to use it. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " There's only one size now. Another one will follow in a few months. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' They will make a Gantt chart for the project next month. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' He finished the presentation with enough time to take some questions. ',
        },
      ],
    },
    {
      List: "A Do you have any questions?\nB As you can see ..., / You'll notice that ...\nC In summary, ...\nD As you know, ...\nE Firstly, ... / Next, ...\nF I'd now like to tell you about ...\nG Finally, I'm going to talk to you about ...\nH I'd like to talk you through the following (three) points",
      ListTitle: 'List of phrases:',
      NumOfSubQuestions: 8,
      Question: 'Match the useful phrases with the tips.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'D',
          QuestionText: "Refer to the audience's knowledge -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'B',
          QuestionText: 'Refer to what images you are showing -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'H',
          QuestionText: 'Tell them the structure of your presentation -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'E',
          QuestionText: 'Use signal words to help them follow you -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'F',
          QuestionText: "Tell them when you're moving on -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'G',
          QuestionText: "Show them when you're near the end -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'C',
          QuestionText: 'Tell them the main points one last time -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'A',
          QuestionText: 'Open up the discussion -answer-',
        },
      ],
    },
  ],
};

export const c3: Challenge = {
  context:
    'Listen to the talk about motivation to practise and improve your listening skills.',
  contextAudio: 'listeningChallengeB2-3.mp3',
  tasks: [
    {
      NumOfSubQuestions: 6,
      Question: 'Are the sentences true or false?',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' We try to motivate workers in the same way that we try to motivate our children. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' In the Glucksberg experiment, the people who were offered a reward finished faster than people who were not offered one. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            " The people who were offered smaller rewards in Ariely's experiment performed better than those offered bigger rewards. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " In Ariely's experiment, people were more creative when they were concentrating on achieving a goal. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' In the future, jobs will require workers to be more creative. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' People always work better when they start the day later and work into the night. ',
        },
      ],
    },
    {
      List: 'A they are not given an incentive.\nB they are doing the jobs of the future.\nC the experiment is repeated.\nD they are doing a simple task.\nE they can make choices about their work.\nF they are offered a bigger reward',
      ListTitle: 'List of sentence halves:',
      NumOfSubQuestions: 6,
      Question: 'Match the sentence halves.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'A',
          QuestionText:
            "Glucksberg's experiment shows that people solve a problem faster when -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'F',
          QuestionText:
            "Ariely's experiment shows that people are less creative when -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'C',
          QuestionText:
            "The same results as Glucksberg's experiment have been found when -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'D',
          QuestionText: 'An incentive works for people when -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'B',
          QuestionText:
            'Incentives will no longer work for motivating people at work when -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'E',
          QuestionText:
            'The example of the big tech companies shows that people work better when -answer-',
        },
      ],
    },
  ],
};

export const c4: Challenge = {
  context:
    "Sam squinted against the sun at the distant dust trail raked up by the car on its way up to the Big House. The horses kicked and flicked their tails at flies, not caring about their owner's first visit in ten months. Sam waited. Mr Carter didn't come out here unless he had to, which was just fine by Sam. The more he kept out of his boss's way, the longer he'd have a job. Carter came by later while Sam was chopping wood. Carter lifted his hat as if he were waiting for an appointment with the town priest, and then removed it completely as if he were talking to his mother. He pulled out a pile of paper from his back pocket and held it out. 'Don't pick up your mail often, do you?' Sam took it without a glance and dropped the envelopes onto the bench. 'Never,' he replied and waited for Carter to say why he was here. The fact it was Carter's house was no explanation and they both knew it. Carter twisted his hat round and round, licking his lips and clearing his throat. 'Nice work fixing those fences,' he said finally. 'I'll be back to the beginning soon,' Sam said. It wasn't a complaint. A fence that took a year to repair meant another year's work to the man who did it well. 'Don't you ever want to take a holiday?' 'And go where?' A holiday meant being back out in the real world, a place even people like Carter travelled to escape from. Sam's escape was his reality and he wasn't going back. Mr Carter wiped the sweat from the back of his neck. The damp patches on his shirt drew together like shapes in an atlas. His skin was already turning ruddy in the June sun. Otherwise he had the indoor tan of a man that made money while other people did the work. 'I've brought my son with me on this trip. He's had some trouble at school.' Mr Carter's eyes flicked up, blinked rapidly and then shifted back to the hat occupying his hands. 'Not much trouble out here for a young boy.' He attempted a laugh but it came out like a dog's bark. The two men looked towards the northern end of the property. It stretched as far as the eye could see. Even the fences were barely visible from where they stood. However bored and rebellious a teenage boy might get, it wasn't possible to escape on foot. Sam looked at the biggest of the horses, kicking at the ground with its heavy hooves. Could the boy ride? he wondered. There was a whole load of trouble a good rider could get into out here, miles away from anyone. But maybe there was even more trouble for someone who knew nothing about horses and wanted to get away from his father.",
  tasks: [
    {
      List: 'A Lives on the farm\nB Owns the farm\nC Has done something wrong',
      ListTitle: 'List of descriptions:',
      NumOfSubQuestions: 3,
      Question: 'Match the descriptions with the characters.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C'],
          CorrectAnswer: 'A',
          QuestionText: 'Sam -answer-',
        },
        {
          Choices: ['A', 'B', 'C'],
          CorrectAnswer: 'B',
          QuestionText: 'Mr Carter -answer-',
        },
        {
          Choices: ['A', 'B', 'C'],
          CorrectAnswer: 'C',
          QuestionText: "Mr Carter's son -answer-",
        },
      ],
    },
    {
      NumOfSubQuestions: 6,
      Question: 'Choose the best answer.',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: [
            'A - Uninterested',
            'B - Surprised',
            'C - Afraid',
            'D - Curious',
          ],
          CorrectAnswer: 'A - Uninterested',
          QuestionText: " What is Sam's reaction to his letters? ",
        },
        {
          Choices: [
            'A - He feels safer on the farm.',
            "B - He can't afford it.",
            "C - He hasn't finished repairing the fences.",
            "D - He doesn't know where to choose.",
          ],
          CorrectAnswer: 'A - He feels safer on the farm.',
          QuestionText: ' Why does Sam not take holidays from work? ',
        },
        {
          Choices: [
            'A - He works hard.',
            "B - He's rich.",
            'C - He has tanned skin.',
            'D - He loves horses.',
          ],
          CorrectAnswer: "B - He's rich.",
          QuestionText: ' What can we guess about Mr Carter? ',
        },
        {
          Choices: [
            'A - He might leave on foot.',
            'B - He might do something dangerous while riding.',
            'C - He might break the fences.',
            'D - He might get into trouble with the neighbours.',
          ],
          CorrectAnswer: 'B - He might do something dangerous while riding.',
          QuestionText:
            " What does Sam think Carter's son might do during his stay at the farm? ",
        },
        {
          Choices: ['A - Angry', 'B - Impatient', 'C - Nervous', 'D - Excited'],
          CorrectAnswer: 'C - Nervous',
          QuestionText:
            " How does Mr Carter feel while he's talking to Sam in this scene? ",
        },
        {
          Choices: [
            'A - Because he wants to give Sam his mail.',
            'B - Because he needs to check on the work on the fences.',
            'C - Because his son has had problems at school.',
            'D - Because his son needs a holiday.',
          ],
          CorrectAnswer: 'C - Because his son has had problems at school.',
          QuestionText: ' Why has Mr Carter come to his house? ',
        },
      ],
    },
  ],
};

export const c5: Challenge = {
  context:
    "Hi! I've been meaning to write for ages and finally today I'm actually doing something about it. Not that I'm trying to make excuses for myself, it's been really hard to sit down and write, as I've been moving around so much. Since we last saw each other I've unpacked my bags in four different cities. This job has turned out to be more of a whirlwind than I expected, but it's all good! I went from London to Prague to set up a new regional office there. You know I'd always wanted to go, but maybe I was imagining Prague in spring when I used to talk about that. Winter was really hard, with minus 15 degrees in the mornings and dark really early in the evening. But at least it was blue skies and white snow and not days on end of grey skies and rain, like at home. It's tough being away from home over Christmas, though, and Skype on Christmas Day wasn't really the same as being with everyone. From there I was on another three-month mission to oversee the set-up of the office in New York. Loved, loved, loved New York! It's like being in one big TV show, as everywhere looks just a little bit familiar. I did every tourist thing you can think of when I wasn't working, and must have spent most of my salary on eating out. It was really hard to leave for the next job, especially as I kind of met someone (!) More about Michael later ... So then I was posted to LA, which felt like a whole other country compared with the East Coast. I could definitely get used to that kind of outdoor, beach lifestyle, but I didn't spend as much time getting to know California as I could have because I was flying back to see Michael every other weekend. He came to see me when he could, but his job means he's often working at weekends, so he couldn't make the flight very often. Those three months flew by and then I was off again, to Frankfurt, which is where I am now. And … so is Michael! He got a month off work and we're trying to work out how we can be in the same place at the same time for a while. We figure the first step in that direction is getting married, which is also why I wanted to write – I can't get married without my oldest friend there! The wedding's going to be at home in London in September and I hope you can come! Anyway, tell me all your news and I promise not to leave it so long this time! Lots of love, Kath",
  tasks: [
    {
      List: 'A London\nB New York\nC Frankfurt\nD Prague\nE LA',
      ListTitle: 'List of cities:',
      NumOfSubQuestions: 5,
      Question: 'Match the cities with the descriptions.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E'],
          CorrectAnswer: 'A',
          QuestionText: 'Where she will get married -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E'],
          CorrectAnswer: 'D',
          QuestionText: "A city that wasn't what she expected -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E'],
          CorrectAnswer: 'B',
          QuestionText: 'An expensive place -answer-',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E'],
          CorrectAnswer: 'E',
          QuestionText: "A place she didn't really see much of -answer-",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E'],
          CorrectAnswer: 'C',
          QuestionText: "The most recent city she's lived in -answer-",
        },
      ],
    },
    {
      NumOfSubQuestions: 6,
      Question: 'Choose the correct answers.',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: [
            'A - making an effort to email people she knows.',
            'B - too busy to even think about writing emails.',
            'C - thinking about writing an email to her friend.',
          ],
          CorrectAnswer: 'C - thinking about writing an email to her friend.',
          QuestionText: ' Recently, Kath has been ...',
        },
        {
          Choices: [
            'A - better than Kath imagined.',
            'B - just as Kath imagined.',
            'C - not as nice as Kath imagined.',
          ],
          CorrectAnswer: 'C - not as nice as Kath imagined.',
          QuestionText: ' Prague was ... ',
        },
        {
          Choices: [
            'A - exciting because she was in a new place.',
            'B - difficult because she missed her family.',
            'C - as good as usual thanks to technology.',
          ],
          CorrectAnswer: 'B - difficult because she missed her family.',
          QuestionText: ' Kath says Christmas was ... ',
        },
        {
          Choices: [
            'A - tourist attractions.',
            'B - restaurants.',
            'C - a TV.',
          ],
          CorrectAnswer: 'B - restaurants.',
          QuestionText: ' In New York, she spent most of her money on ... ',
        },
        {
          Choices: [
            "A - It's nice for a holiday but not to live.",
            'B - She would have enjoyed spending more time at the beach.',
            "C - She didn't really like the beach part of the LA lifestyle.",
          ],
          CorrectAnswer:
            'B - She would have enjoyed spending more time at the beach.',
          QuestionText: ' How did Kath feel about LA? ',
        },
        {
          Choices: [
            'A - thinking about how to spend more time together.',
            'B - working out where to hold the wedding.',
            'C - planning to get engaged.',
          ],
          CorrectAnswer: 'A - thinking about how to spend more time together.',
          QuestionText: ' Kath and Michael are ... ',
        },
      ],
    },
  ],
};

export const c6: Challenge = {
  context:
    "In Britain, the average person spends more than £1,000 on new clothes a year, which is around four per cent of their income. That might not sound like much, but that figure hides two far more worrying trends for society and for the environment. First, a lot of that consumer spending is via credit cards. British people currently owe approximately £670 per adult to credit card companies. That's 66 per cent of the average wardrobe budget. Also, not only are people spending money they don't have, they're using it to buy things they don't need. Britain throws away 300,000 tons of clothing a year, most of which goes into landfill sites. People might not realise they are part of the disposable clothing problem because they donate their unwanted clothes to charities. But charity shops can't sell all those unwanted clothes. 'Fast fashion' goes out of fashion as quickly as it came in and is often too poor quality to recycle; people don't want to buy it second-hand. Huge quantities end up being thrown away, and a lot of clothes that charities can't sell are sent abroad, causing even more economic and environmental problems. However, a different trend is springing up in opposition to consumerism – the 'buy nothing' trend. The idea originated in Canada in the early 1990s and then moved to the US, where it became a rejection of the overspending and overconsumption of Black Friday and Cyber Monday during Thanksgiving weekend. On Buy Nothing Day people organise various types of protests and cut up their credit cards. Throughout the year, Buy Nothing groups organise the exchange and repair of items they already own. The trend has now reached influencers on social media who usually share posts of clothing and make-up that they recommend for people to buy. Some YouTube stars now encourage their viewers not to buy anything at all for periods as long as a year. Two friends in Canada spent a year working towards buying only food. For the first three months they learned how to live without buying electrical goods, clothes or things for the house. For the next stage, they gave up services, for example haircuts, eating out at restaurants or buying petrol for their cars. In one year, they'd saved $55,000. The changes they made meant two fewer cars on the roads, a reduction in plastic and paper packaging and a positive impact on the environment from all the energy saved. If everyone followed a similar plan, the results would be impressive. But even if you can't manage a full year without going shopping, you can participate in the anti-consumerist movement by refusing to buy things you don't need. Buy Nothing groups send a clear message to companies that people are no longer willing to accept the environmental and human cost of overconsumption.",
  tasks: [
    {
      NumOfSubQuestions: 8,
      Question: 'Are the sentences true or false?',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' People buy clothes because they want to throw them away. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' The writer thinks it is worrying that people spend money on things they do not need. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' The amount the average Briton owes on credit cards is one third of the amount they spend on clothes each year. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' Only a very small proportion of unwanted clothes are thrown away. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' Charities can find ways to use clothes even if they are not very good quality. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: ' Buy Nothing Day is a protest against credit cards. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " The two friends who did the 'buy nothing' experiment only bought food for 12 months. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' If everyone followed the Buy Nothing idea, the environment would benefit. ',
        },
      ],
    },
    {
      List: 'A hand\nB shops\nC spending\nD sites\nE fashion\nF away',
      ListTitle: 'List of words:',
      NumOfSubQuestions: 6,
      Question: 'Complete the sentences.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'E',
          QuestionText: 'Fast -answer- is made quickly and cheaply',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'F',
          QuestionText:
            'Some clothing is so cheap that people can afford to wear it a couple of times and throw it -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'C',
          QuestionText:
            'There is a worrying trend for more consumer -answer- on credit cards.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'B',
          QuestionText:
            'Giving clothes to charity -answer- does not completely solve the problem.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'A',
          QuestionText:
            'Make sure you only donate clothes that people will want to buy second- -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'D',
          QuestionText:
            'A lot of clothes donated to charity cannot be reused and end up in landfill -answer- ',
        },
      ],
    },
  ],
};

export const c7: Challenge = {
  context:
    "This gorgeous brown sofa made by grandsofas.com is excellent quality and extremely comfortable. It is in immaculate condition (see photo) and comes with a 25-yr guarantee. Material is cotton and it has a cool modern feel. Cushion covers are all removable and machine washable, with a quality foam filling, and it's super comfortable. Keeps its shape when you sit on it. The dark-coloured wooden legs can be easily removed to allow the sofa to fit through a standard doorway. No wear and tear as we've only had it for two years and kept it in good condition. Sofa comes from a smoke-free, pet-free home. Only selling it due to moving house as the new place isn't big enough for the sofa. Sofa measurements: Width: 182 cm, Overall height: 81 cm, Height without legs: 63 cm. Any questions, feel free to ask. Asking price: £250. **For collection ONLY**",
  tasks: [
    {
      NumOfSubQuestions: 6,
      Question: 'Are the sentences true or false?',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: ' Short adverts with the key details work best. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " Don't give information about the condition of the item. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: ' Use clear paragraphs. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: " You mustn't use bullet points. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: " Delivery information isn't necessary. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: ' You must always write in complete sentences. ',
        },
      ],
    },
    {
      List: 'A Perfect\nB Square\nC due to\nD nearest\nE wear and tear\nF immediate\nG collection\nH design',
      ListTitle: 'List of words:',
      NumOfSubQuestions: 8,
      Question: 'Complete the advert.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'F',
          QuestionText: 'Beautiful large white coffee table for -answer- sale.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'H',
          QuestionText:
            'Good condition. Sleek, modern -answer- with a solid wood base and a glass top.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'B',
          QuestionText: ' -answer- shape, 120 x 120 x 50 cm.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'A',
          QuestionText:
            ' -answer- for books, magazines, drinks or plates of snacks.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'E',
          QuestionText: 'Minor -answer- , not really noticeable.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'C',
          QuestionText: 'Selling -answer- moving house.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'D',
          QuestionText:
            'Please call or message Alex at 09876 543210 to view. Asking price £50 or -answer- offer.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'G',
          QuestionText: 'For -answer- only.',
        },
      ],
    },
  ],
};

export const c8: Challenge = {
  context:
    "A report on students' experiences of working abroad\nIntroduction\nCurrently, approximately 25 per cent of Hawthorne College students work abroad during the summer break. This report aims to show the benefits and drawbacks of working overseas in order to decide whether the college should recommend the experience to its students./nTo prepare for this report, a sample of 100 students were interviewed, 23 of whom had worked abroad. This is a summary of their comments./nBenefits/nAccording to the students interviewed, working overseas during the summer holidays can bring several benefits. Most of all, students can improve their foreign language skills by working in a non-English speaking country. This may help them get a better job in the future. Additionally, learning about a different culture and way of life makes people more open-minded. A further advantage is that students may become more confident when they learn practical skills to help them live independently later in life, for example, finding accommodation and cooking for themselves./nDrawbacks/nHowever, a large number of interviewees mentioned drawbacks as well. Students who need to study over the summer will find it difficult to do so while working abroad. Most significant of all are finance issues: only a minority of students are able to afford travel expenses, accommodation and visas. In addition, students may have to take low-income jobs if they are not fluent in the local language, so they may struggle to cover their expenses./nConclusion and recommendation /nWorking abroad may improve students' language skills and confidence. However, students often need to earn money during the holidays to support their studies and working abroad may not provide the opportunity to save. Also, the cost of travel means that only students who are able to afford it have the chance to do this. Therefore, the college should only recommend working abroad if there is financial support from the college for students that need it.",
  tasks: [
    {
      List: 'A Therefore, this is not a good idea for all students.\nB The main objective of this report is to ...\nC Students may have problems getting visas.\nD Students can improve their chances of ...',
      ListTitle: 'List of sentences:',
      NumOfSubQuestions: 4,
      Question: 'Match the sentences with the sections of the report.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'B',
          QuestionText: 'Introduction -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'D',
          QuestionText: 'Advantages -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'C',
          QuestionText: 'Disadvantages -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'A',
          QuestionText: 'Conclusion -answer- ',
        },
      ],
    },
    {
      List: 'A Given the points made above, it is recommended that ...\nB this report aims to ...\nC The majority of the students interviewed said that ...\nD This report is based on information from 100 interviews with students.',
      ListTitle: 'List of phrases:',
      NumOfSubQuestions: 4,
      Question: 'Match the phrases with the same function.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'B',
          QuestionText: 'The main objective of this report is to ... -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'D',
          QuestionText:
            'To prepare for this report, 100 students were interviewed. -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'C',
          QuestionText: 'According to the students interviewed, ... -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D'],
          CorrectAnswer: 'A',
          QuestionText:
            'Taking all these factors into account, it is suggested that ... -answer- ',
        },
      ],
    },
  ],
};

export const c9: Challenge = {
  context:
    "Hi Linda,\nHow's it going?/nSorry I haven't been in touch for such a long time but I've had exams so I've been studying every free minute. Anyway, I'd love to hear all your news and I'm hoping we can get together soon to catch up. We just moved to a bigger flat so maybe you can come and visit one weekend?/nHow's the new job?  /nLooking forward to hearing from you!/nHelga/nHi Helga,/nI've been meaning to write to you for ages now so don't worry! How did your exams go? When will you know your results? I'm sure you did brilliantly as always!/nAs for me, I'll have been in the new job three months by the end of next week so I'm feeling more settled in. At first I felt like I had no idea what I was doing but now I realise it's normal to feel like that. There was a lot to learn – there still is actually – and I soon had to get used to the idea that I can't know everything. I used to work late a lot and at weekends but I'm slowly getting into a normal routine./nWhich means I'd love to come and visit! We really need a good catch up! I can't believe we haven't seen each other since Carl's wedding. How does next month sound?/nAnyway, I'd better get back to work./nCongratulations on the new flat! Can't wait to see you!/nLove,/nLinda",
  tasks: [
    {
      NumOfSubQuestions: 6,
      Question: 'Are the sentences true or false?',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: " 'Hi ...' is less formal than 'Dear ... ,'. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            "  'How's it going?' is an informal way to say 'How are you?'. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " It's important to give the reason for writing in the first sentence. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " Phrasal verbs like 'catch up' make your writing sound more formal. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            " 'How does ... sound?' is an informal way of suggesting something. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " People don't write in paragraphs in informal emails. ",
        },
      ],
    },
    {
      List: "A Things have been good and ...\nB Sorry to hear that!\nC Don't worry! I've been super busy too.\nD So good to hear your news!\nE I'd love to. How about Tuesday?\nF Happy to help any way I can.",
      ListTitle: 'List of replies:',
      NumOfSubQuestions: 6,
      Question: 'Match the sentences and the replies.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'E',
          QuestionText:
            'I was wondering if you want to go for dinner. -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'C',
          QuestionText: "I'm really sorry I've not been in touch. -answer- ",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'A',
          QuestionText: 'How are you doing? -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'D',
          QuestionText: 'Just to let you know I passed my exams! -answer- ',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'B',
          QuestionText:
            "I've been ill for most of the month so I couldn't come to your party. -answer- ",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F'],
          CorrectAnswer: 'F',
          QuestionText: 'I was hoping you could do me a favour. -answer- ',
        },
      ],
    },
  ],
};

export const c10: Challenge = {
  context:
    "In this video, Vanya tells Paul and Emir about her latest idea. Listen to the language they use for challenging someone's ideas and practise saying the useful phrases.",
  contextAudio: 'speakingChallengeB2-1.mp4',
  tasks: [
    {
      NumOfSubQuestions: 8,
      Question: 'Are the sentences true or false?',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: ' Vanya is very excited about her new idea. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            '  She wants to add a few cat videos to their social media account. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: ' Paul loves the idea. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: " Emir isn't sure about the idea at first. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' Vanya believes that sharing cat videos will increase their number of social media followers. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText: " Emir wants to know more details about Vanya's plan. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            " Vanya already knows who's going to find the cat videos. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText:
            ' In the end, Emir thinks they should try a different idea. ',
        },
      ],
    },
    {
      List: 'A point\nB about\nC lost\nD challenges\nE fact\nF both\nG coming\nH exactly',
      ListTitle: 'List of words:',
      NumOfSubQuestions: 8,
      Question: 'Complete the dialogue.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'C',
          QuestionText: "A: Food! Fridays!\nB: I'm a bit -answer- .",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'B',
          QuestionText: 'B: What are you talking -answer- ?',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'E',
          QuestionText:
            "A: Food Fridays! Every Friday, someone brings in some food they've made for the office to share. Healthy, of course. I think it will really improve the mood in the office.\nB: Oh. Have you considered the -answer- that some people don't like cooking?",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'G',
          QuestionText:
            "A: Yes, of course. People could buy something instead. And we'd make a list of what people can't eat and things like that too.\nB: I see where you're -answer- from, but how is this going to improve people's mood if they have to spend money?",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'A',
          QuestionText:
            "A: I take your -answer- , but l'm sure we could make arrangements with the finance department so that people can get the money back.",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'H',
          QuestionText: 'B: Perhaps. So how -answer- do you see this working?',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'D',
          QuestionText:
            "A: Well, we set up a calendar and people write their name next to the Friday when they want to bring something.\nB: But what if some people don't write their names? Or forget to bring the food?\nA: I'm very aware of the -answer- here, but I think enough people will love the idea, and we really need something positive right now!",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'F',
          QuestionText:
            "B: OK, I guess you have to look at it from -answer- sides. Once it starts, people who don't like the idea now might change their minds ... OK, let's try it!",
        },
      ],
    },
  ],
};

export const c11: Challenge = {
  context:
    'In this video, Noelia and Yuna talk about how to encourage creativity in the office. Listen to the language they use to discuss advantages and disadvantages and practise saying the useful phrases.',
  contextAudio: 'speakingChallengeB2-2.mp4',
  tasks: [
    {
      NumOfSubQuestions: 6,
      Question: 'Are the sentences true or false?',
      QuestionType: 'Multiple Choice',
      SubQuestions: [
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' Noelia thinks it would be a good idea to have a trampoline in the office. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: "  Yuna has her best ideas when she's at her desk. ",
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: ' Noelia has never been on a trampoline. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            ' Yuna is worried about what the clients would think of the trampoline. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'True',
          QuestionText:
            '  Noelia thinks that trampolining is good for your health. ',
        },
        {
          Choices: ['True', 'False'],
          CorrectAnswer: 'False',
          QuestionText: " Yuna says yes to Noelia's idea. ",
        },
      ],
    },
    {
      List: 'A disadvanatges\nB sure\nC advantages\nD mean\nE issue\nF coming\nG other\nH hand',
      ListTitle: 'List of words:',
      NumOfSubQuestions: 8,
      Question: 'Complete the sentences.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'H',
          QuestionText: "On the one -answer- it's a lovely idea.",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'G',
          QuestionText: 'But on the -answer- hand it could be noisy.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'D',
          QuestionText: 'I see what you -answer- .',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'B',
          QuestionText: "I'm just not -answer- if a trampoline is necessary.",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'E',
          QuestionText:
            'There could be an -answer- with the clients seeing us jumping around.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'F',
          QuestionText:
            "I see where you're -answer- from, but I think our clients will love it!",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'C',
          QuestionText:
            "There are lots of -answer- to trampolining. It's good for you.",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'A',
          QuestionText:
            'I can also see the -answer- . What if someone hurts themself?',
        },
      ],
    },
  ],
};

export const c12: Challenge = {
  context:
    'In this video, Paul and Bob try to help Noelia with a problem. Listen to the language they use for giving advice and practise saying the useful phrases.',
  contextAudio: 'speakingChallengeB2-3.mp4',
  tasks: [
    {
      Questions: [
        // Kept the same error for demonstration
        {
          NumOfSubQuestions: 6,
          Question: 'Are the sentences true or false?',
          QuestionType: 'Multiple Choice',
          SubQuestions: [
            {
              Choices: ['True', 'False'],
              CorrectAnswer: 'True',
              QuestionText:
                ' Noelia is stressed because a client keeps emailing her about unimportant things. ',
            },
            {
              Choices: ['True', 'False'],
              CorrectAnswer: 'False',
              QuestionText:
                ' Noelia thinks she should ask the client to stop sending emails. ',
            },
            {
              Choices: ['True', 'False'],
              CorrectAnswer: 'False',
              QuestionText: " Noelia likes Bob's suggestion at first. ",
            },
            {
              Choices: ['True', 'False'],
              CorrectAnswer: 'True',
              QuestionText: ' Bob had a similar problem in a previous job. ',
            },
            {
              Choices: ['True', 'False'],
              CorrectAnswer: 'True',
              QuestionText:
                ' Bob suggests that the scar on his neck is from a snake bite. ',
            },
            {
              Choices: ['True', 'False'],
              CorrectAnswer: 'True',
              QuestionText: " Noelia follows Bob's advice and it works. ",
            },
          ],
        },
      ],
    },
    {
      List: 'A sure\nB should\nC doing\nD were\nE try\nF do\nG suggested\nH too',
      ListTitle: 'List of words:',
      NumOfSubQuestions: 8,
      Question: 'Complete the sentences.',
      QuestionType: 'List Selection',
      SubQuestions: [
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'B',
          QuestionText: 'What do you think I -answer- do.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'D',
          QuestionText: "If I -answer- you, I'd ask her to stop.",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'A',
          QuestionText: "I'm not -answer- that's a good idea.",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'E',
          QuestionText:
            'Perhaps you could -answer- talking to Noelia about it.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'A',
          QuestionText: "Why don't you try -answer- nothing?",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'F',
          QuestionText: 'Perhaps you could just -answer- nothing.',
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'H',
          QuestionText: "I'm not -answer- sure about that.",
        },
        {
          Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          CorrectAnswer: 'G',
          QuestionText: 'So, I tried what you -answer- suggested.',
        },
      ],
    },
  ],
};
