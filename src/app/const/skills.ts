import { CraftState } from '../models/craft-state';
import { Skill } from '../models/skill';

export const travailDeBase: Skill = {
  name: 'Travail de base',
  icon: '',
  progress: (craft: CraftState): void => {
    const efficiency = 120;
    const durabilityCost = 10;
    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;

    craft.progress -= Math.floor((Math.floor(p1 * p2) * efficiency) / 100);
    craft.durability -= durabilityCost;
  },
};

export const SKILLS: Skill[] = [travailDeBase];
