import { ListeningPart, ReadingPart } from './LRUtilities';

export const listeningParts: ListeningPart[] = [
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
              [
                'A- Few rooms now have a different purpose of use.',
                'B- A different kind of seating arrangement has been installed.',
              ],
              [
                'A- Few rooms now have a different purpose of use.',
                'B- A different kind of seating arrangement has been installed.',
              ],
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
              ['D- a bookshop', 'B- backstage tours'],
              ['D- a bookshop', 'B- backstage tours'],
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
              ['C- making puppets', 'E- lighting'],
              ['C- making puppets', 'E- lighting'],
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
            CorrectAnswer: 'A- elements affecting where beings live',
            QuestionText:
              'What are the students consent which should be included in their aims?',
          },
          {
            Choices: ['A- string', 'B- a compass', 'C- a ruler'],
            CorrectAnswer: 'A- string',
            QuestionText:
              'What tools did they not remember to take on the Field Trip?',
          },
          {
            Choices: [
              'A- the sequence in which data is given.',
              'B- the way the information is bifurcated.',
              'C- the amount of information given.',
            ],
            CorrectAnswer: 'C- the amount of information given.',
            QuestionText: "In Helen's section, Colin suggests a change in",
          },
          {
            Choices: [
              'A- It provided precise results.',
              'B- It was easy to carry out.',
              'C- It required special equipment.',
            ],
            CorrectAnswer: 'B- It was easy to carry out.',
            QuestionText:
              'What do they say about the technique they used to measure wave speed?',
          },
          {
            Choices: [
              'A- She chose the incorrect scale.',
              'B-  She stood in the wrong place.',
              'C- She did it at the wrong time.',
            ],
            CorrectAnswer: 'B-  She stood in the wrong place.',
            QuestionText:
              'What error did Helen make when first drawing the map?',
          },
          {
            Choices: [
              'A- scan it onto a computer',
              'B- check it using photographs',
              'C- add information from the internet',
            ],
            CorrectAnswer: 'B- check it using photographs',
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
              ['A- lack of water', 'D- high temperatures'],
              ['A- lack of water', 'D- high temperatures'],
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
              [
                'C- wrong identification of few organisms',
                'E- missing some organisms when calculating',
              ],
              [
                'C- wrong identification of few organisms',
                'E- missing some organisms when calculating',
              ],
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
              "The designer of a public building may need to think about the building's: \n\n-function\n\n-physical and -answer- context\n\n-symbolic meaning",
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
              "Building design:\n\nIt's approached by a -answer- for walkers.\nThe building is the shape of a -answer-.\nOne exterior wall functions as a large -answer-",
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

export const readingParts: ReadingPart[] = [
  {
    NumOfQuestions: 3,
    MyPartitionKey: 'ReadingP1',
    MySortKey: '2',
    Passage:
      "In the last century, Vikings have been perceived in numerous diﬀerent ways - vilified as conquerors and romanticised as adventurers. How Vikings have been employed in nation-building is a topic of some interest.\n\nIn English, Vikings are also known as Norse or Norsemen. Their language greatly inﬂuenced English, with the nouns, 'Hell', 'husband', 'law', and 'window', and the verbs, 'blunder', 'snub', 'take', and 'want', all coming from Old Norse. However, the origins of the word 'Viking', itself, are obscure: it may mean 'a Scandinavian pirate', or it may refer to 'an inlet', or a place called Vik, in modem-day Norway, from where the pirates came. These various names - Vikings, Norse, or Norsemen, and doubts about the very word 'Viking' suggest historical confusion.\n\nLoosely speaking, the Viking Age endured from the late eighth to the mid-eleventh centuries. Vikings sailed to England in AD 793 to storm coastal monasteries, and subsequently, large swathes of England fell under Viking rule - indeed several Viking kings sat on the English throne. It is generally agreed that the Battle of Hastings, in 1066, when the Norman French invaded, marks the end of the English Viking Age, but the Irish Viking age ended earlier, while Viking colonies in Iceland and Greenland did not dissolve until around AD 1500.\n\nHow much territory Vikings controlled is also in dispute - Scandinavia and Western Europe certainly, but their reach east and south is uncertain. They plundered and settled down the Volga and Dnieper rivers, and traded with modem-day Istanbul, but the archaeological record has yet to verify that Vikings raided as far away as Northwest Africa, as some writers claim.\n\nThe issue of control and extent is complex because many Vikings did not return to Scandinavia after raiding but assimilated into local populations, often becoming Christian. To some degree, the Viking Age is defined by religion. Initially, Vikings were polytheists, believing in many gods, but by the end of the age, they had permanently accepted a new monotheistic religious system - Christianity.\n\nThis transition from so-called pagan plunderers to civilised Christians is significant and is the view promulgated throughout much of recent history. In the UK, in the 1970s for example, schoolchildren were taught that until the Vikings accepted Christianity they were nasty heathens who rampaged throughout Britain. By contrast, today's children can visit museums where Vikings are celebrated as merchants, pastoralists, and artists with a unique worldview as well as conquerors.\n\nWhat are some other interpretations of Vikings? In the nineteenth century, historians in Denmark, Norway, and Sweden constructed their own Viking ages for nationalistic reasons. At that time, all three countries were in crisis. Denmark had been beaten in war and ceded territory to what is now Germany. Norway had become independent from Sweden in 1905 but was economically vulnerable, so Norwegians sought to create a separate identity for themselves in the past as well as the present. The Norwegian historian, Gustav Storm, was adamant it was his forebears and not the Swedes' or Danes' who had colonised Iceland, Greenland, and Vinland, in what is now Canada. Sweden, meanwhile, had relinquished Norway to the Norwegians and Finland to the Russians; thus, in the late nineteenth century, Sweden was keen to boost its image with rich archaeological finds to show the glory of its Viking past.\n\nIn addition to augmenting nationalism, nineteenth-century thinkers were influenced by an Englishman, Herbert Spencer, who described peoples and cultures in evolutionary terms similar to those of Charles Darwin. Spencer coined the phrase 'survival of the fittest', which includes the notion that, over time, there is not only technological but also moral progress. Therefore, Viking heathens' adoption of Christianity was considered an advantageous move. These days, historians do not compare cultures in the same way, especially since, in this case, the archaeological record seems to show that heathen Vikings and Christian Europeans were equally brutal.\n\nViews of Vikings change according to not only to forces aﬀecting historians at the time of their research but also according to the materials they read. Since much knowledge of Vikings comes from literature composed up to 300 years after the events they chronicle, some Danish historians cal1 these sources 'mere legends'.\n\nVikings did have a written language carved on large stones, but as few of these survive today, the most reliable contemporary sources on Vikings come from writers from other cultures, like the ninth-century Persian geographer, Ibn Khordadbeh.\n\nIn the last four decades, there have been wildly varying interpretations of the Viking inﬂuence in Russia. Most non-Russian scholars believe the Vikings created a kingdom in western Russia and modern-day Ukraine led by a man called Rurik. After AD 862, Rurik's descendants continued to rule. There is considerable evidence of this colonisation: in Sweden, carved stones, still standing, describe the conquerors' journeys; both Russian and Ukrainian have loan words from Old Norse; and, Scandinavian first names, like Igor and Olga, are still popular. However, during the Soviet period, there was an emphasis on the Slavic origins of most Russians. (Appearing in the historical record around the sixth century AD, the Slavs are thought to have originated in Eastern Europe.) This Slavic identity was promoted to contrast with that of the neighbouring Viking Swedes, who were enemies during the Cold War.\n\nThese days, many Russians consider themselves hybrids. Indeed recent genetic studies support a Norse-colonisation theory: western Russian DNA is consistent with that of the inhabitants of a region north of Stockholm in Sweden.\n\nThe tools available to modern historians are many and varied, and their findings may seem less open to debate. There are linguistics, numismatics, dendrochronology, archaeozoology, palaeobotany, ice crystallography, climate and DNA analysis to add to the translation of runes and the raising of mighty warships. Despite these, historians remain children of their times.",
    PassageTitle: 'The vikings wayfaring way',
    Questions: [
      {
        QuestionType: 'Table Completion',
        Question:
          'Complete the notes below.\n\nWrite NO MORE THAN TWO WORDS OR A NUMBER for each answer\n\nWrite your answers in boxes 1-5 on your answer sheet.',
        NumOfSubQuestions: 4,
        SubQuestions: [
          {
            QuestionText:
              "Word 'Viking' is -answer-\n Vikings came from Scandinavia.",
            RowTitle: 'Origins',
            CorrectAnswers: [['obscure']],
            QuestionWeight: 1,
          },
          {
            QuestionText:
              'In Britain: AD -answer- -1066\nLength varies elsewhere',
            RowTitle: 'Dates of the Viking Age',
            CorrectAnswers: [['793']],
            QuestionWeight: 1,
          },
          {
            QuestionText:
              'In doubt - but most of Europe\nPossibly raided as far away as -answer-',
            RowTitle: 'Territorial extent',
            CorrectAnswers: [['Northwest Africa']],
            QuestionWeight: 1,
          },
          {
            QuestionText:
              'Vikings had assimilated into -answer- , & adopted a new -answer- system.',
            RowTitle: 'End of the Viking Age',
            CorrectAnswers: [['local populations'], ['religious']],
            QuestionWeight: 2,
          },
        ],
      },
      {
        QuestionType: 'List Selection',
        List: 'A In the UK today\nB In 19th-century Norway\nC In 19th-century Sweden\nD In 19th-century England\nE In Denmark today\nF In 9th-century Persia\nG In mid-20th century Soviet Union\nH In Russia today',
        Question:
          'Look at the following statements and the list of times and places below.\n\nMatch each statement with the correct place or time: A-H.\n\nWrite the correct letter, A-H, in boxes 1-8 on your answer sheet.',
        NumOfSubQuestions: 8,
        ListTitle: 'List of times & places:',
        SubQuestions: [
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'F',
            QuestionText:
              'A geographer documents Viking culture as it happens. -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'D',
            QuestionText:
              ' A philosopher classifies cultures hierarchically. -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'E',
            QuestionText:
              'Historians assert that Viking history is based more on legends than facts. -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'A',
            QuestionText:
              'Young people learn about Viking cultural and economic activities. -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'G',
            QuestionText:
              'People see themselves as unrelated to Vikings. -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'B',
            QuestionText:
              'An historian claims Viking colonists to modem-day Canada came from his land. -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'C',
            QuestionText:
              "Viking conquests are exaggerated to bolster the country's ego after a territorial loss. -answer-",
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            CorrectAnswer: 'H',
            QuestionText:
              'DNA tests show locals are closely related to Swedes. -answer-',
          },
        ],
      },
      {
        QuestionType: 'Multiple Choice',
        Question:
          'Choose the correct letter A-E.\n\nWrite the correct letter in box 1 on your answer sheet',
        NumOfSubQuestions: 1,
        SubQuestions: [
          {
            Choices: [
              'A brief history of Vikings',
              'Recent Viking discoveries',
              'A modem fascination with Vikings',
              'Interpretations of Viking history',
              'Viking history and nationalism',
            ],
            CorrectAnswer: 'Interpretations of Viking history',
            QuestionText: 'Which might be a suitable title for passage?',
          },
        ],
      },
    ],
  },
  {
    NumOfQuestions: 3,
    MyPartitionKey: 'ReadingP2',
    MySortKey: '2',
    Passage:
      "The prospects for humanity and for the world as a whole are somewhere between glorious and dire. It is hard to be much more precise.\n\nA\nBy 'glorious', I mean that our descendants - all who are born on to this Earth - could live very comfortably and securely, and could continue to do so for as long as the Earth can support life, which should be for a very long time indeed. We should at least be thinking in terms of the next million years. Furthermore, our descendants could continue to enjoy the company of other species - establishing a much better relationship with them than we have now. Other animals need not live in constant fear of us. Many of those fellow species now seem bound to become extinct, but a significant proportion could and should continue to live alongside us. Such a future may seem ideal, and so it is. Yet I do not believe it is fanciful. There is nothing in the physical fabric of the Earth or in our own biology to suggest that this is not possible.\n\nB\n'Dire' means that we human beings could be in deep trouble within the next few centuries, living but also dying in large numbers in political terror and from starvation, while huge numbers of our fellow creatures would simply disappear, leaving only the ones that we find convenient - chickens, cattle - or that we can't shake off, like flies and mice. I'm taking it to be self-evident that glory is preferable.\n\nC\nOur future is not entirely in our own hands because the Earth has its own rules, is part of the solar system and is neither stable nor innately safe. Other planets in the solar system are quite beyond habitation, because their temperature is far too high or too low to be endured, and ours, too, in principle could tip either way. Even relatively unspectacular changes in the atmosphere could do the trick. The core of the Earth is hot, which in many ways is good for living creatures, but every now and again, the molten rock bursts through volcanoes on the surface. Among the biggest volcanic eruptions in recent memory was Mount St Helens, in the USA, which threw out a cubic kilometre of ash - fortunately, in an area where very few people live. In 1815, Tambora (in present-day Indonesia) expelled so much ash into the upper atmosphere that climatic effects seriously harmed food production around the world for the season after season. Entire civilisations have been destroyed by volcanoes.\n\nD\nYet nothing we have so far experienced shows what volcanoes can really do. Yellowstone National Park in the USA occupies the caldera (the crater formed when a volcano collapses) of an exceedingly ancient volcano of extraordinary magnitude. Modem surveys show that its centre is now rising. Sometime in the next 200 million years, Yellowstone could erupt again, and when it does, the whole world will be transformed. Yellowstone could erupt tomorrow. But there's a very good chance that it will give us another million years, and that surely is enough to be going on with. It seems sensible to assume that this will be the case.\n\nE\nThe universe at large is dangerous, too: in particular, we share the sky with vast numbers of asteroids, and now and again, the come into our planet's atmosphere. An asteroid the size of a small island, hitting the Earth at 15,000 kilometres an hour (a relatively modest speed by the standards of heavenly bodies), would strike the ocean bed like a rock in a puddle, send a tidal wave around the world as high as a small mountain and as fast as a jumbo jet, and propel us into an ice age that could last for centuries. There are plans to head off such disasters (including rockets to push approaching asteroids into new trajectories), but in truth, it's down to luck.\n\nF\nOn the other hand, the archaeological and the fossil evidence shows that no truly devastating asteroid has struck since the one that seems to have accounted for the extinction of the dinosaurs 65 million years ago. So again, there seems no immediate reason for despair. The Earth is indeed an uncertain place, in an uncertain universe, but with average luck, it should do us well enough. If the world does become inhospitable in the next few thousand or million years, then it will probably be our own fault. In short, despite the underlying uncertainty, our own future and that of our fellow creatures are very much in our own hands.\n\nG\nGiven average luck on the geological and the cosmic scale, the difference between glory and disaster will be made and is being made, by politics. Certain kinds of political systems and strategies would predispose us to long-term survival (and indeed to comfort and security and pleasure of being alive), while others would take us more and more frenetically towards collapse. The broad point is, though, that we need to look at ourselves - humanity - and at the world in general in a quite new light. Our material problems are fundamentally those of biology. We need to think, and we need our politicians to think, biologically. Do that, and take the ideas seriously, and we are in with a chance. Ignore biology and we and our fellow creatures haven't a hope.",
    PassageTitle: 'The future never dies?',
    Questions: [
      {
        QuestionType: 'Yes No Not Given',
        Question:
          'Do the following statements agree with the claims of the writer in Reading Passage?\n\nIn boxes 1-6 on your answer sheet, write:\nYes, if the statement agrees with the views of the writer.\n No, if the statement contradicts the views of the writer.\n Not Given, if it is impossible to say what the writer thinks about this.',
        NumOfSubQuestions: 6,
        SubQuestions: [
          {
            Choices: ['Yes', 'No', 'Not Given'],
            CorrectAnswer: 'Yes',
            QuestionText:
              'It seems predictable that some species will disappear. -answer-',
          },
          {
            Choices: ['Yes', 'No', 'Not Given'],
            CorrectAnswer: 'No',
            QuestionText:
              'The nature of the Earth and human biology make it impossible for human beings to survive another million years. -answer-',
          },
          {
            Choices: ['Yes', 'No', 'Not Given'],
            CorrectAnswer: 'Yes',
            QuestionText:
              ' An eruption by Yellowstone is likely to be more destructive than previous volcanic eruptions. -answer-',
          },
          {
            Choices: ['Yes', 'No', 'Not Given'],
            CorrectAnswer: 'Not Given',
            QuestionText:
              'There is a greater chance of the Earth being hit by small asteroids than large ones. -answer-',
          },
          {
            Choices: ['Yes', 'No', 'Not Given'],
            CorrectAnswer: 'No',
            QuestionText:
              'If the world becomes uninhabitable, it is most likely to be as a result of a natural disaster. -answer-',
          },
          {
            Choices: ['Yes', 'No', 'Not Given'],
            CorrectAnswer: 'Not Given',
            QuestionText:
              'Politicians currently in power seem unlikely to change their way of thinking. -answer-',
          },
        ],
      },
      {
        QuestionType: 'Summary Completion',
        Question:
          'Complete the summary below.\n\nChoose NO MORE THAN TWO WORDS from the passage for each answer.\n\nWrite your answers in boxes 1-6 on your answer sheet.',
        NumOfSubQuestions: 1,
        SubQuestions: [
          {
            CorrectAnswers: [
              ['temperature'],
              ['molten rock', 'rock', 'ash'],
              ['food'],
              ['tidal wave'],
              ['ice age'],
              ['rockets'],
            ],
            QuestionWeight: 6,
            QuestionText:
              'The Earth could become uninhabitable, like other planets, through a major change in the -answer-. Volcanic eruptions of -answer- can lead to shortages of -answer- in a wide area. An asteroid hitting the Earth could create a -answer- that would result in a new -answer-. Plans are being made to use -answer- to deflect asteroids heading for the Earth.',
          },
        ],
      },
      {
        QuestionType: 'Multiple Choice',
        Question:
          'Choose the correct letter A, B, C or D.\n\nWrite your answer in box 1 on your answer sheet.',
        NumOfSubQuestions: 1,
        SubQuestions: [
          {
            Choices: [
              'to propose a new theory about the causes of natural disasters',
              'to prove that generally held beliefs about the future are all mistaken',
              'to present a range of opinions currently held by scientists',
              'to argue the need for a general change in behavior',
            ],
            CorrectAnswer: 'to argue the need for a general change in behavior',
            QuestionText: "What is the writer's purpose in the passage?",
          },
        ],
      },
    ],
  },
  {
    NumOfQuestions: 2,
    MyPartitionKey: 'ReadingP3',
    MySortKey: '2',
    Passage:
      "A\nSince cosmetics and perfumes are still in wide use today, it is interesting to compare the attitudes, customs and beliefs related to them in ancient times to those of our own day and age. Cosmetics and perfumes have been popular since the dawn of civilization; it is shown by the discovery of a great deal of pertinent archaeological material, dating from the third millennium BC. Mosaics, glass perfume flasks, stone vessels, ovens, cooking-pots, clay jars, etc., some inscribed by the hand of the artisan. Evidence also appears in the Bible and other classical writings, where it is written that spices and perfumes were prestigious products known throughout the ancient world and coveted by kings and princes. The written and pictorial descriptions, as well as archaeological findings, all show how important body care and aesthetic appearance were in the lives of the ancient people. The chain of evidence spans many centuries, detailing the usage of cosmetics in various cultures from the earliest period of recorded history.\n\nB\nIn antiquity, however, at least in the onset, cosmetics served in religious ceremonies and for healing purposes. Cosmetics were also connected with cultic worship and witchcraft: to appease the various gods, fragrant ointments were applied to the statuary images and even to their attendants. From this, in the course of time, developed the custom of personal use, to enhance the beauty of the face and the body, and to conceal defects.\n\nC\nPerfumes and fragrant spices were precious commodities in antiquity, very much in demand, and at times even exceeded silver and gold in value. Therefore they were luxury products, used mainly in the temples and in the homes of the noble and wealthy. The Judean kings kept them in treasure houses (2 Kings 20:13). And the Queen of Sheba brought to Solomon “camels laden with spices, gold in great quantity and precious stones.” (1 Kings 10:2, 10). However, within time, the use of cosmetics became the custom of that period. The use of cosmetics became widespread among the lower classes as well as among the wealthy; in the same way, they washed the body, so they used to care for the body with substances that softened the skin and anoint it with fragrant oils and ointments.\n\nD\nFacial treatment was highly developed and women devoted many hours to it. They used to spread various scented creams on the face and to apply makeup in vivid and contrasting colors. An Egyptian papyrus from the 16th century BC contains detailed recipes to remove blemishes, wrinkles, and other signs of age. Greek and Roman women would cover their faces in the evening with a “beauty mask” to remove blemishes, which consisted mainly of flour mixed with fragrant spices, leaving it on their face all night. The next morning they would wash it off with asses' milk. The very common creams used by women in the ancient Far East, particularly important in the hot climate and prevalent in that area of the globe, were made up of oils and aromatic scents. Sometimes the oil in these creams was extracted from olives, almonds, gourds, sesame, or from trees and plants; but, for those of limited means, scented animal and fish fats were commonly used.\n\nE\nWomen in the ancient past commonly put colors around their eyes. Besides beautification, its purpose was also medicinal as covering the sensitive skin of the lids with colored ointments that prevented dryness and eye diseases: the eye-paint repelled the little flies that transmitted eye inflammations. Egyptian women colored the upper eyelid black and the lower one green and painted the space between the upper lid and the eyebrow gray and blue. The women of Mesopotamia favored yellows and reds. The use of kohl for painting the eyes is mentioned three times in the Bible, always with disapproval by the sages (2 Kings, 9:30; Jeremiah 4:30; Ezekiel 23:40). In contrast, Job named one of his daughters “Keren Happukh”- “horn of eye paint” (Job 42:14)\n\nF\nGreat importance was attached to the care for hair in ancient times. Long hair was always considered a symbol of beauty, and kings, nobles and dignitaries grew their hair long and kept it well-groomed and cared for. Women devoted much time to the style of the hair; while no cutting, they would apply much care to it by arranging it skillfully in plaits and “building it up” sometimes with the help of wigs. Egyptian women generally wore their hair flowing down to their shoulders or even longer. In Mesopotamia, women cherished long hair as a part of their beauty, and hair flowing down their backs in a thick plait and tied with a ribbon is seen in art. Assyrian women wore their hair shorter, braiding and binding it in a bun at the back. In Ancient Israel, brides would wear their hair long on the wedding day as a sign of their virginity. Ordinary people and slaves, however, usually wore their hair short, mainly for hygienic reasons, since they could not afford to invest in the kind of treatment that long hair required.\n\nG\nFrom the Bible and Egyptian and Assyrian sources, as well as the words of classical authors, it appears that the centers of the trade-in aromatic resins and incense were located in the kingdoms of southern Arabia, and even as far as India, where some of these precious aromatic plants were grown. “Dealers from Sheba and Rammah dealt with you, offering the choicest spices…” (Ezekiel 27:22). The Nabateans functioned as the important middlemen in this trade; Palestine also served as a very important component, as the trade routes crisscrossed the country. It is known that the Egyptian Queen Hatsheput (15th century BC) sent a royal expedition to the Land of Punt (Somalia) in order to bring back myrrh seedlings to plant in her temple. In Assyrian records of tribute and spoils of war, perfumes and resins are mentioned; the text from the time of Tukulti-Ninurta II (890-884 BC) refers to balls of myrrh as a part of the tribute brought to the Assyrian king by the Aramaean kings. The trade-in spices and perfumes are also mentioned in the Bible as written in Genesis (37:25-26), “Camels carrying gum tragacanth and balm and myrrh”.",
    PassageTitle: 'Cosmetics in Ancient Past',
    Questions: [
      {
        QuestionType: 'Matching Paragraph Information',
        Question:
          'Reading Passage has 7 paragraphs A-G\n\nWhich paragraph contains the following information?\n\nWrite your answers in boxes 1-7 on your answer sheet.',
        NumOfSubQuestions: 7,
        SubQuestions: [
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            CorrectAnswer: 'D',
            QuestionText:
              'recipes to conceal facial defects caused by aging -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            CorrectAnswer: 'G',
            QuestionText:
              'perfumes were presented to conquerors in war -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            CorrectAnswer: 'F',
            QuestionText:
              ' long hair of girls had special meanings in marriage -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            CorrectAnswer: 'A',
            QuestionText:
              'evidence exists in abundance showing cosmetics use in ancient times -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            CorrectAnswer: 'E',
            QuestionText:
              'protecting eyes from fly-transmitted diseases -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            CorrectAnswer: 'B',
            QuestionText: 'from witchcraft to beautification -answer-',
          },
          {
            Choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            CorrectAnswer: 'C',
            QuestionText: 'more expensive than gold -answer-',
          },
        ],
      },
      {
        QuestionType: 'True False Not Given',
        Question:
          'Do the following statements agree with the information given in Reading Passage?\nIn boxes 1-6 on your answer sheet, write:\n\nTrue, if the statement agrees with the information\nFalse,if the statement contradicts the information\nNot Given, If there is no information on this',
        NumOfSubQuestions: 6,
        SubQuestions: [
          {
            Choices: ['True', 'False', 'Not Given'],
            CorrectAnswer: 'Not Given',
            QuestionText:
              'The written record for cosmetics and perfumes dates back to the third millennium BC. -answer-',
          },
          {
            Choices: ['True', 'False', 'Not Given'],
            CorrectAnswer: 'False',
            QuestionText:
              'Since perfumes and spices were luxury products, their use was exclusive to the noble and the wealthy. -answer-',
          },
          {
            Choices: ['True', 'False', 'Not Given'],
            CorrectAnswer: 'True',
            QuestionText:
              'In the ancient Far East, fish fats were used as a cream by a woman from poor households. -answer-',
          },
          {
            Choices: ['True', 'False', 'Not Given'],
            CorrectAnswer: 'True',
            QuestionText:
              'The teachings in the Bible were repeatedly against the use of kohl for painting the eyes. -answer-',
          },
          {
            Choices: ['True', 'False', 'Not Given'],
            CorrectAnswer: 'False',
            QuestionText:
              'Long hair as a symbol of beauty was worn solely by women of ancient cultures. -answer-',
          },
          {
            Choices: ['True', 'False', 'Not Given'],
            CorrectAnswer: 'Not Given',
            QuestionText:
              'The Egyptian Queen Hatsheput sent a royal expedition to Punt to establish a trade route for myrrh. -answer-',
          },
        ],
      },
    ],
  },
];
