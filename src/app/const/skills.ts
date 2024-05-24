import { CraftState } from '../models/craft-state';
import { Skill } from '../models/skill';

/* Progress skills */

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
    endStep(craft, 3, 'Travail de base');
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
    endStep(craft, 3, 'Mémoire musculaire');

    craft.buffs.memoireMusculaire = 5;
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
    endStep(craft, 3, 'Travail prudent');
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
    endStep(craft, 3, 'Travail préparatoire');
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

    endStep(craft, 3, 'Travail économe');
  },
};

/* Bonus skills */

export const veneration: Skill = {
  name: 'Vénération',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 18,
  level: 15,
  progress: (craft: CraftState): void => {
    craft.ps -= 18;
    endStep(craft, 2, 'Vénération');

    craft.buffs.veneration = 4;
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
    endStep(craft, 2, 'Parcimonie');

    // remove parcimonie pérenne buff if it's active
    if (craft.buffs.parcimoniePerenne > 0) {
      craft.buffs.parcimoniePerenne = 0;
    }

    craft.buffs.parcimonie = 4;
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
    endStep(craft, 2, 'Parcimonie pérenne');

    // remove parcimonie buff if it's active
    if (craft.buffs.parcimonie > 0) {
      craft.buffs.parcimonie = 0;
    }

    craft.buffs.parcimoniePerenne = 8;
  },
};

/* Repair skills */

export const reparationDeMaitre: Skill = {
  name: 'Réparation de maître',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 88,
  level: 7,
  progress: (craft: CraftState): void => {
    craft.ps -= 88;
    craft.currentDurability =
      craft.currentDurability + 30 > craft.durability
        ? craft.durability
        : craft.currentDurability + 30;
    endStep(craft, 2, 'Réparation de maître');
  },
};

export const manipulation: Skill = {
  name: 'Manipulation',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 96,
  level: 65,
  progress: (craft: CraftState): void => {
    craft.ps -= 96;
    endStep(craft, 2, 'Manipulation');

    craft.buffs.manipulation = 8;
  },
};

/* Other skills */

export const observation: Skill = {
  name: 'Observation',
  icon: '',
  firstStepOnly: false,
  noParcimonie: false,
  psCost: 7,
  level: 13,
  progress: (craft: CraftState): void => {
    craft.ps -= 7;
    endStep(craft, 2, 'Observation');
  },
};

/**
 * List of all skills
 */
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
  parcimoniePerenne,
];

/**
 * Calculate progress buffs
 * @param craft state of the craft
 * @returns progress multiplier
 */
function progressBuffs(craft: CraftState): number {
  const base = 100;
  let bonus = 0;

  // add bonus if Mémoire musculaire is active
  if (craft.buffs.memoireMusculaire > 0) {
    bonus += 100;
    craft.buffs.memoireMusculaire = 0;
  }
  // add bonus if Vénération is active
  if (craft.buffs.veneration > 0) {
    bonus += 50;
  }

  return (base + bonus) / 100;
}

/**
 * Apply durability buffs
 * @param durability skill durability
 * @param craft state of the craft
 * @returns modified durability
 */
function durabilityBuffs(durability: number, craft: CraftState): number {
  if (craft.buffs.parcimonie > 0 || craft.buffs.parcimoniePerenne > 0) {
    return Math.floor(durability / 2);
  } else {
    return durability;
  }
}

function endStep(craft: CraftState, time: number, action: string): void {
  // if manipulation is active, add 5 durability
  if (
    craft.currentDurability > 0 &&
    craft.buffs.manipulation > 0 &&
    action !== 'Manipulation'
  ) {
    craft.currentDurability =
      craft.currentDurability + 5 > craft.durability
        ? craft.durability
        : craft.currentDurability + 5;
  }

  craft.step++;
  decrementBuffs(craft);
  craft.time += time;
  craft.craftAction = action;
}

/**
 * Decrement all buffs
 * @param craft state of the craft
 */
function decrementBuffs(craft: CraftState): void {
  const buffs = { ...craft.buffs };

  for (const key in buffs) {
    const k = key as keyof typeof buffs;
    if (buffs[k] > 0) {
      buffs[k]--;
    }
  }

  craft.buffs = buffs;
}
