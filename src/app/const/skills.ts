import { CraftState } from '../models/craft-state';
import { NewSkill, Skill } from '../models/skill';

/* Progress skills */

export const travailDeBase: NewSkill = {
  name: 'Travail de base',
  icon: '',
  efficiency: 120,
  durCost: 10,
  psCost: 0,
  type: 'p',
  level: 1,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const memoireMusculaire: NewSkill = {
  name: 'Mémoire musculaire',
  icon: '',
  efficiency: 300,
  durCost: 10,
  psCost: 6,
  type: 'p',
  level: 54,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const travailPrudent: NewSkill = {
  name: 'Travail prudent',
  icon: '',
  efficiency: 180,
  durCost: 10,
  psCost: 7,
  type: 'p',
  level: 62,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const travailPreparatoire: NewSkill = {
  name: 'Travail préparatoire',
  icon: '',
  efficiency: 360,
  durCost: 20,
  psCost: 18,
  type: 'p',
  level: 72,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

//!\\
//!\\ impossible to use under parcimonie/parcimonie pérenne
//!\\
export const travailEconome: NewSkill = {
  name: 'Travail économe',
  icon: '',
  efficiency: 180,
  durCost: 5,
  psCost: 18,
  type: 'p',
  level: 88,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

//!\\
//!\\ combination with observation
//!\\
export const travailAttentif: NewSkill = {
  name: 'Travail attentif',
  icon: '',
  efficiency: 200,
  durCost: 10,
  psCost: 5,
  type: 'p',
  level: 67,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const PROGRESS_SKILLS: NewSkill[] = [
  memoireMusculaire,
  travailDeBase,
  travailPrudent,
  travailPreparatoire,
  travailEconome,
  travailAttentif,
];

export const PROGRESS_SKILLS_NAMES = PROGRESS_SKILLS.map((skill) => skill.name);

/* Quality skills */

export const ouvrageDeBase: NewSkill = {
  name: 'Ouvrage de base',
  icon: '',
  efficiency: 100,
  durCost: 10,
  psCost: 18,
  type: 'q',
  level: 5,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 1,
};

export const ouvrageStandard: NewSkill = {
  name: 'Ouvrage standard',
  icon: '',
  efficiency: 125,
  durCost: 10,
  psCost: 32,
  type: 'q',
  level: 18,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 1,
};

export const ouvrageAvance: NewSkill = {
  name: 'Ouvrage avancé',
  icon: '',
  efficiency: 150,
  durCost: 10,
  psCost: 46,
  type: 'q',
  level: 84,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 1,
};

export const benedictionDeByregot: NewSkill = {
  name: 'Bénédiction de Byregot',
  icon: '',
  efficiency: 100,
  durCost: 10,
  psCost: 24,
  type: 'q',
  level: 50,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

//!\\
//!\\ combination with observation
//!\\
export const ouvrageAttentif: NewSkill = {
  name: 'Ouvrage attentif',
  icon: '',
  efficiency: 150,
  durCost: 10,
  psCost: 18,
  type: 'q',
  level: 68,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 1,
};

export const ouvrageParcimonieux: NewSkill = {
  name: 'Ouvrage parcimonieux',
  icon: '',
  efficiency: 100,
  durCost: 5,
  psCost: 25,
  type: 'q',
  level: 66,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 1,
};

export const ouvragePreparatoire: NewSkill = {
  name: 'Ouvrage préparatoire',
  icon: '',
  efficiency: 200,
  durCost: 20,
  psCost: 40,
  type: 'q',
  level: 71,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 2,
};

//!\\
//!\\ make sure that main preste could be used after first step
//!\\
export const mainPreste: NewSkill = {
  name: 'Main preste',
  icon: '',
  efficiency: 0,
  durCost: 0,
  psCost: 250,
  type: 'q',
  level: 80,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const veritableValeur: NewSkill = {
  name: 'Véritable valeur',
  icon: '',
  efficiency: 100,
  durCost: 10,
  psCost: 6,
  type: 'q',
  level: 69,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 2,
};

//!\\
//!\\ make sure to use it only when iq = 10
//!\\
export const mainDivine: NewSkill = {
  name: 'Main divine',
  icon: '',
  efficiency: 100,
  durCost: 0,
  psCost: 32,
  type: 'q',
  level: 90,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const QUALITY_SKILLS: Skill[] = [];
export const QUALITY_SKILLS_NAMES = QUALITY_SKILLS.map((skill) => skill.name);

/* Bonus skills */

export const veneration: NewSkill = {
  name: 'Vénération',
  icon: '',
  efficiency: 0,
  durCost: 0,
  psCost: 18,
  type: 'pb',
  level: 15,
  time: 2,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const parcimonie: Skill = {
  name: 'Parcimonie',
  icon: '',
  psCost: (craft: CraftState): number => 56,
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
  psCost: (craft: CraftState): number => 98,
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

export const grandsProgres: Skill = {
  name: 'Grands progrès',
  icon: '',
  psCost: (craft: CraftState): number => 32,
  level: 21,
  progress: (craft: CraftState): void => {
    craft.ps -= 32;
    endStep(craft, 2, 'Grands progrès');

    craft.buffs.grandsProgres = 3;
  },
};

export const innovation: Skill = {
  name: 'Innovation',
  icon: '',
  psCost: (craft: CraftState): number => 18,
  level: 26,
  progress: (craft: CraftState): void => {
    craft.ps -= 18;
    endStep(craft, 2, 'Innovation');

    craft.buffs.innovation = 4;
  },
};

/* Repair skills */

export const reparationDeMaitre: NewSkill = {
  name: 'Réparation de maître',
  icon: '',
  efficiency: 0,
  durCost: 0,
  psCost: 88,
  type: 'db',
  level: 7,
  time: 3,
  xMem: 0,
  xVen: 0,
  xGP: 0,
  xInno: 0,
  iq: 0,
};

export const manipulation: Skill = {
  name: 'Manipulation',
  icon: '',
  psCost: (craft: CraftState): number => 96,
  level: 65,
  progress: (craft: CraftState): void => {
    craft.ps -= 96;
    endStep(craft, 2, 'Manipulation');

    craft.buffs.manipulation = 8;
  },
};

export const REPAIR_SKILLS: Skill[] = [];
export const REPAIR_SKILLS_NAMES = REPAIR_SKILLS.map((skill) => skill.name);

/* Other skills */

export const observation: Skill = {
  name: 'Observation',
  icon: '',
  psCost: (craft: CraftState): number => 7,
  level: 13,
  progress: (craft: CraftState): void => {
    craft.ps -= 7;
    endStep(craft, 2, 'Observation');

    craft.buffs.observation = 1;
  },
};

export const travailMinutieux: Skill = {
  name: 'Travail minutieux',
  icon: '',
  psCost: (craft: CraftState): number => 32,
  level: 76,
  progress: (craft: CraftState): void => {
    const qualEff = qualityBuffs(100, craft);
    const progEff = progressBuffs(100, craft);
    const durabilityCost = durabilityBuffs(10, craft);

    const q1 = (craft.control * 10) / craft.qualDiv + 35;
    const q2 = craft.clvl <= craft.rlvl ? craft.qualMod / 100 : 1;
    craft.currentQuality += Math.floor((Math.floor(q1 * q2) * qualEff) / 100);

    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;
    craft.currentProgress += Math.floor((Math.floor(p1 * p2) * progEff) / 100);

    craft.currentDurability -= durabilityCost;
    craft.ps -= 32;
    craft.iq += craft.iq < 10 ? 1 : 0;
    endStep(craft, 3, 'Travail minutieux');
  },
};

export const PROGRESS_BONUS_SKILLS: Skill[] = [];
export const PROGRESS_BONUS_SKILLS_NAMES = PROGRESS_BONUS_SKILLS.map(
  (skill) => skill.name
);

export const QUALITY_BONUS_SKILLS: Skill[] = [innovation, grandsProgres];
export const QUALITY_BONUS_SKILLS_NAMES = QUALITY_BONUS_SKILLS.map(
  (skill) => skill.name
);

export const DURABILITY_BONUS_SKILLS: Skill[] = [parcimoniePerenne, parcimonie];
export const DURABILITY_BONUS_SKILLS_NAMES = DURABILITY_BONUS_SKILLS.map(
  (skill) => skill.name
);

// export const OTHER_SKILLS: Skill[] = [observation];

/**
 * List of all skills
 */
export const SKILLS: Skill[] = [];

/**
 * Calculate progress buffs
 * @param craft state of the craft
 * @returns progress multiplier
 */
function progressBuffs(eff: number, craft: CraftState): number {
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

  const mult = (base + bonus) / 100;

  return eff * mult;
}

function qualityBuffs(eff: number, craft: CraftState): number {
  const base = 100;
  let bonus = 0;

  // add bonus if Grands progrès is active
  if (craft.buffs.grandsProgres > 0) {
    bonus += 100;
    craft.buffs.grandsProgres = 0;
  }

  // add bonus if Innovation is active
  if (craft.buffs.innovation > 0) {
    bonus += 50;
  }

  const mult = (base + bonus) / 100;

  return eff * (1 + craft.iq / 10) * mult;
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
    craft.buffs.manipulation > 0 &&
    craft.currentDurability > 0 &&
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
  craft.craftActions.push(action);
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
