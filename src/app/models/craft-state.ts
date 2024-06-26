export interface CraftState {
  // craft stats
  name: string;
  progress: number;
  quality: number;
  durability: number;
  craftLevel: number;
  rlvl: number;
  progDiv: number;
  progMod: number;
  qualDiv: number;
  qualMod: number;

  // player stats
  playerLevel: number;
  clvl: number;
  craftmanship: number;
  control: number;
  ps: number;

  // infos about the current step
  step: number;
  craftActions: string[];
  time: number;
  currentProgress: number;
  currentQuality: number;
  currentDurability: number;

  state: { progress: number; quality: number; durability: number }[];

  // buffs
  buffs: {
    memoireMusculaire: number;
    parcimonie: number;
    parcimoniePerenne: number;
    veneration: number;
    manipulation: number;
    grandsProgres: number;
    innovation: number;
    observation: number;
    ouvrageDeBase: number;
    ouvrageStandard: number;
  };
  iq: number;
  bene: boolean;
}
