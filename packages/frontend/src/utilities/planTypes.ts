import { LRQuestion } from './LRUtilities';

export type Challenge = {
  context: string;
  contextAudio?: string;
  tasks: LRQuestion[];
};

/** This is the structure of the hard-coded plans that will be stored in the
 * database.  These will be used to create a plan for each user when he takes
 * the sections test.
 */
export type PlanTemplate = {
  challenges: Array<{
    challengeId: string;
    isCompleted: false;
  }>;
};

/**
 * This repsenets a training plan.  This type is used in `Profile`.
 */
export type Plan = {
  challenges: Array<{
    challengeId: string;
    isCompleted: boolean;
  }>;
  level: CefrLevel;
};

/**
 * Each user has a profile of his own, which will contain user information
 * alongside his training plans if any.
 */
export type Profile = {
  uid: string;
  listening?: Plan;
  reading?: Plan;
  vocab?: Plan;
  writing?: Plan;
  speaking?: Plan;
};

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
