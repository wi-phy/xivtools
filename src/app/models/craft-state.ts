export interface CraftState {
  // craft stats
  name: string;
  progress: number;
  quality: number;
  durability: number;
  rlvl: number;
  progDiv: number;
  progMod: number;

  // player stats
  clvl: number;
  craftmanship: number;
  control: number;
  ps: number;

  // current step / time spent
  step: number;
  time: number;

  // buffs
  buffs: {
    memoireMusculaire: number;
  };
}
