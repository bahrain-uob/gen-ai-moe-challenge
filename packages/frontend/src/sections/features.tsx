import { BsBook, BsBarChart, BsArrowRepeat, BsFingerprint  } from 'react-icons/bs';

const features = [
  {
    name: 'Comprehensive Content',
    description: 'It covers all English Test sections (Speaking, Listening, Reading, Writing)',
    icon: BsBook,
  },
  {
    name: 'Instant Feedback',
    description: 'Receive immediate feedback regarding your performance',
    icon: BsBarChart,
  },
  {
    name: 'Up-to-Date Tests',
    description: 'Test yourself using up-to-date tests',
    icon: BsArrowRepeat,
  },
  {
    name: 'Personalized Learning',
    description: 'Get a personalized plan based on your level.',
    icon: BsFingerprint ,
  },
];

export default function Example() {
  return (
    <div className=" py-10  px-10 sm:py-10">
      
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-4">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
    
  )
}
