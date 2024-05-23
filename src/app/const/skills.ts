import { CraftState } from '../models/craft-state';
import { Skill } from '../models/skill';

export const travailDeBase: Skill = {
  name: 'Travail de base',
  icon: '',
  firstStepOnly: false,
  psCost: 0,
  progress: (craft: CraftState): void => {
    const efficiency = 120;
    const durabilityCost = 10;

    const multBuffs = progressBuffs(craft);
    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;

    craft.currentProgress += Math.floor(
      (Math.floor(p1 * p2) * efficiency * multBuffs) / 100
    );
    craft.durability -= durabilityCost;
    craft.step++;
    craft.time += 3;
  },
};

export const memoireMusculaire: Skill = {
  name: 'Mémoire musculaire',
  icon: '',
  firstStepOnly: true,
  psCost: 6,
  progress: (craft: CraftState): void => {
    const efficiency = 300;
    const durabilityCost = 10;

    // note: impossible to have buffs with Mémoire musculaire
    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;

    craft.currentProgress += Math.floor(
      (Math.floor(p1 * p2) * efficiency) / 100
    );
    craft.durability -= durabilityCost;
    craft.ps -= 6;
    craft.buffs.memoireMusculaire = 5;
    craft.step++;
    craft.time += 3;

    decrementBuffs(craft);
  },
};

export const travailPrudent: Skill = {
  name: 'Travail prudent',
  icon: '',
  firstStepOnly: false,
  psCost: 7,
  progress: (craft: CraftState): void => {
    const efficiency = 180;
    const durabilityCost = 10;

    const multBuffs = progressBuffs(craft);
    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;

    craft.currentProgress += Math.floor(
      (Math.floor(p1 * p2) * efficiency * multBuffs) / 100
    );
    craft.durability -= durabilityCost;
    craft.step++;
    craft.time += 3;
  },
};

export const SKILLS: Skill[] = [
  travailDeBase,
  memoireMusculaire,
  travailPrudent,
];

function progressBuffs(craft: CraftState): number {
  const buffs = craft.buffs;
  const base = 100;
  let bonus = 0;

  // add bonus if Mémoire musculaire is active
  if (buffs.memoireMusculaire > 0) {
    bonus += 100;
    buffs.memoireMusculaire = 0;
  }

  return (base + bonus) / 100;
}

function decrementBuffs(craft: CraftState): void {
  const buffs = craft.buffs;

  for (const key in buffs) {
    const k = key as keyof typeof buffs;
    if (buffs[k] > 0) {
      buffs[k]--;
    }
  }
}
