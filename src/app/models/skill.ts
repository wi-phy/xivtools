import { CraftState } from './craft-state';

export interface Skill {
  name: string;
  icon: string;
  firstStepOnly: boolean;
  noParcimonie: boolean;
  psCost: number;
  progress: (craft: CraftState) => void;
}
