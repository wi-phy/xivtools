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
