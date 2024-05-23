import { CraftState } from '../models/craft-state';
import { Skill } from '../models/skill';

export const travailDeBase: Skill = {
  name: 'Travail de base',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
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
    craft.currentDurability -= durabilityCost;
    craft.step++;
    decrementBuffs(craft);
    craft.time += 3;
    craft.craftAction = 'Travail de base';
  },
};

export const memoireMusculaire: Skill = {
  name: 'Mémoire musculaire',
  icon: '',
  firstStepOnly: true,
  noParcimonie: false,
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
    craft.currentDurability -= durabilityCost;
    craft.ps -= 6;
    craft.step++;
    decrementBuffs(craft);
    craft.memoireMusculaire = 5;
    craft.time += 3;
    craft.craftAction = 'Mémoire musculaire';
  },
};

export const travailPrudent: Skill = {
  name: 'Travail prudent',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
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
    craft.currentDurability -= durabilityCost;
    craft.ps -= 7;
    craft.step++;
    decrementBuffs(craft);
    craft.time += 3;
    craft.craftAction = 'Travail prudent';
  },
};

export const travailPreparatoire: Skill = {
  name: 'Travail préparatoire',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 18,
  progress: (craft: CraftState): void => {
    const efficiency = craft.durability < 20 ? 180 : 360;
    const durabilityCost = 20;

    const multBuffs = progressBuffs(craft);
    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;

    craft.currentProgress += Math.floor(
      (Math.floor(p1 * p2) * efficiency * multBuffs) / 100
    );
    craft.currentDurability -= durabilityCost;
    craft.ps -= 18;
    craft.step++;
    decrementBuffs(craft);
    craft.time += 3;
    craft.craftAction = 'Travail préparatoire';
  },
};

export const travailEconome: Skill = {
  name: 'Travail économe',
  icon: '',
  firstStepOnly: false,
  noParcimonie: true,
  psCost: 18,
  progress: (craft: CraftState): void => {
    const efficiency = 180;
    const durabilityCost = 5;

    const multBuffs = progressBuffs(craft);
    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;

    craft.currentProgress += Math.floor(
      (Math.floor(p1 * p2) * efficiency * multBuffs) / 100
    );
    craft.currentDurability -= durabilityCost;
    craft.ps -= 18;
    craft.step++;
    decrementBuffs(craft);
    craft.time += 3;
    craft.craftAction = 'Travail économe';
  },
};

export const veneration: Skill = {
  name: 'Vénération',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 18,
  progress: (craft: CraftState): void => {
    craft.ps -= 18;
    craft.step++;
    decrementBuffs(craft);
    craft.veneration = 4;
    craft.time += 2;
    craft.craftAction = 'Vénération';
  },
};

export const reparationDeMaitre: Skill = {
  name: 'Réparation de maître',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 88,
  progress: (craft: CraftState): void => {
    craft.ps -= 88;
    craft.step++;
    decrementBuffs(craft);
    craft.currentDurability =
      craft.currentDurability + 30 > craft.durability
        ? craft.durability
        : craft.currentDurability + 30;
    craft.time += 2;
    craft.craftAction = 'Réparation de maître';
  },
};

export const SKILLS: Skill[] = [
  travailDeBase,
  memoireMusculaire,
  travailPrudent,
  travailPreparatoire,
  travailEconome,
  veneration,
  reparationDeMaitre,
];

function progressBuffs(craft: CraftState): number {
  const base = 100;
  let bonus = 0;

  // add bonus if Mémoire musculaire is active
  if (craft.memoireMusculaire > 0) {
    bonus += 100;
    craft.memoireMusculaire = 0;
  }
  // add bonus if Vénération is active
  if (craft.veneration > 0) {
    bonus += 50;
  }

  return (base + bonus) / 100;
}

function decrementBuffs(craft: CraftState): void {
  if (craft.memoireMusculaire > 0) {
    craft.memoireMusculaire--;
  }
  if (craft.veneration > 0) {
    craft.veneration--;
  }
}
