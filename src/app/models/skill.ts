import { CraftState } from './craft-state';

export interface Skill {
  name: string;
  icon: string;
  progress: (craft: CraftState) => void;
}
