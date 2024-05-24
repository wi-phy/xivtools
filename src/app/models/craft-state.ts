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

  // infos about the current step
  step: number;
  craftAction: string;
  time: number;
  currentProgress: number;
  currentQuality: number;
  currentDurability: number;

  // buffs
  buffs: {
    memoireMusculaire: number;
    parcimonie: number;
    parcimoniePerenne: number;
    veneration: number;
  };
}
