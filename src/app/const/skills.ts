import { CraftState } from '../models/craft-state';
import { Skill } from '../models/skill';

export const travailDeBase: Skill = {
  name: 'Travail de base',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 0,
  level: 1,
  progress: (craft: CraftState): void => {
    const efficiency = 120;
    const durabilityCost = durabilityBuffs(10, craft);

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
  level: 54,
  progress: (craft: CraftState): void => {
    const efficiency = 300;
    const durabilityCost = durabilityBuffs(10, craft);

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
  level: 62,
  progress: (craft: CraftState): void => {
    const efficiency = 180;
    const durabilityCost = durabilityBuffs(10, craft);

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
  level: 72,
  progress: (craft: CraftState): void => {
    const efficiency = craft.durability < 20 ? 180 : 360;
    const durabilityCost = durabilityBuffs(20, craft);

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
  level: 88,
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
  level: 15,
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
  level: 7,
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

export const observation: Skill = {
  name: 'Observation',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 7,
  level: 13,
  progress: (craft: CraftState): void => {
    craft.ps -= 7;
    craft.step++;
    decrementBuffs(craft);
    craft.time += 2;
    craft.craftAction = 'Observation';
  },
};

export const parcimonie: Skill = {
  name: 'Parcimonie',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 56,
  level: 15,
  progress: (craft: CraftState): void => {
    craft.ps -= 56;
    craft.step++;
    decrementBuffs(craft);

    // remove parcimonie pérenne buff if it's active
    if (craft.parcimoniePerenne > 0) {
      craft.parcimoniePerenne = 0;
    }

    craft.parcimonie = 4;
    craft.time += 2;
    craft.craftAction = 'Parcimonie';
  },
};

export const parcimoniePerenne: Skill = {
  name: 'Parcimonie pérenne',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 98,
  level: 47,
  progress: (craft: CraftState): void => {
    craft.ps -= 98;
    craft.step++;
    decrementBuffs(craft);

    // remove parcimonie buff if it's active
    if (craft.parcimonie > 0) {
      craft.parcimonie = 0;
    }

    craft.parcimoniePerenne = 8;
    craft.time += 2;
    craft.craftAction = 'Parcimonie pérenne';
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
  observation,
  parcimonie,
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

function durabilityBuffs(durability: number, craft: CraftState): number {
  if (craft.parcimonie > 0) {
    return Math.floor(durability / 2);
  } else {
    return durability;
  }
}

function decrementBuffs(craft: CraftState): void {
  if (craft.memoireMusculaire > 0) {
    craft.memoireMusculaire--;
  }
  if (craft.veneration > 0) {
    craft.veneration--;
  }
}
