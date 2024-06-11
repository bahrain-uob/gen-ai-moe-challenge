import { Profile } from './planTypes';

//  this will include dummy data for the profile
export const sampleProfile: Profile = {
  PK: '123456',
  SK: 'plan',
  listening: {
    challenges: [
      { challengeId: '1', isCompleted: true },
      { challengeId: '2', isCompleted: true },
      { challengeId: '3', isCompleted: false },
      { challengeId: '4', isCompleted: false },
      { challengeId: '5', isCompleted: false },
    ],
    level: 'A2',
  },
  speaking: {
    challenges: [
      { challengeId: '1', isCompleted: true },
      { challengeId: '2', isCompleted: false },
      { challengeId: '3', isCompleted: false },
    ],
    level: 'B2',
  },
  reading: {
    challenges: [
      { challengeId: '1', isCompleted: false },
      { challengeId: '2', isCompleted: false },
      { challengeId: '3', isCompleted: false },
    ],
    level: 'A1',
  },
  vocab: {
    challenges: [
      { challengeId: '1', isCompleted: true },
      { challengeId: '2', isCompleted: true },
      { challengeId: '3', isCompleted: false },
      { challengeId: '4', isCompleted: false },
    ],
    level: 'B1',
  },
  // writing plan is missing to support the case of no plan available
};
