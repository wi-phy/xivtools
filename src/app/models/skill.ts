import { CraftState } from './craft-state';

export interface Skill {
  name: string;
  icon: string;
  firstStepOnly?: boolean;
  observationOnly?: boolean;
  noParcimonie?: boolean;
  iqOnly?: boolean;
  iqMaxOnly?: boolean;
  psCost: (craft: CraftState) => number;
  level: number;
  progress: (craft: CraftState) => void;
  progressSimul?: (craft: CraftState) => number;
}

export interface NewSkill {
  name: string;
  icon: string;
  efficiency: number;
  durCost: number;
  psCost: number;
  type: 'p' | 'q' | 'd' | 'pb' | 'qb' | 'db';
  level: number;
  time: number;
  xMem: 0 | 1;
  xVen: 0 | 1;
  xGP: 0 | 1;
  xInno: 0 | 1;
  iq: number;
}
