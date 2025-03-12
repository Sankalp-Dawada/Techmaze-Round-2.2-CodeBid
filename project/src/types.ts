export interface Challenge {
  id: number;
  language: string;
  title: string;
  description: string;
  buggyCode: string;
  correctCode: string;
  hint: string;
}

export interface ChallengeState {
  completed: boolean;
  userCode: string;
}

export type Language = 'Java' | 'C++' | 'C' | 'Python';