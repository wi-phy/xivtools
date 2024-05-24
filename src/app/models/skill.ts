import { CraftState } from './craft-state';

export interface Skill {
  name: string;
  icon: string;
  firstStepOnly?: boolean;
  observationOnly?: boolean;
  noParcimonie?: boolean;
  psCost: (craft: CraftState) => number;
  level: number;
  progress: (craft: CraftState) => void;
}
