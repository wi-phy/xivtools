import { Injectable, inject, signal } from '@angular/core';
import { PlayerStats } from '../models/player-stats';
import { CLVL } from '../const/clvl';
import { XivapiService } from './xivapi.service';
import {
  DURABILITY_BONUS_SKILLS,
  DURABILITY_BONUS_SKILLS_NAMES,
  PROGRESS_BONUS_SKILLS_NAMES,
  PROGRESS_SKILLS,
  PROGRESS_SKILLS_NAMES,
  QUALITY_BONUS_SKILLS_NAMES,
  QUALITY_SKILLS,
  QUALITY_SKILLS_NAMES,
  REPAIR_SKILLS,
  REPAIR_SKILLS_NAMES,
  SKILLS,
  benedictionDeByregot,
  grandsProgres,
  innovation,
  mainDivine,
  mainPreste,
  memoireMusculaire,
  ouvrageAttentif,
  ouvrageAvance,
  ouvrageDeBase,
  ouvrageParcimonieux,
  ouvragePreparatoire,
  ouvrageStandard,
  parcimonie,
  reparationDeMaitre,
  travailAttentif,
  travailDeBase,
  travailEconome,
  travailPreparatoire,
  travailPrudent,
  veneration,
  veritableValeur,
} from '../const/skills';
import { CraftState } from '../models/craft-state';
import { NewSkill, Skill } from '../models/skill';
import { deepCopy } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CraftPredictService {
  private xivService = inject(XivapiService);

  playerStats = signal<PlayerStats>({
    craftmanship: 4065,
    control: 3976,
    level: 90,
    ps: 604,
  });

  craftActions = SKILLS;
  steps: CraftState[] = [];
  result: CraftState = {} as CraftState;
  maxTime = 999;
  debug: any[] = [];

  skillsDebug = [veneration, parcimonie, innovation];

  predict(): void {
    console.time('Function Execution Time');
    this.maxTime = 999;

    const craft = this.initCraft();

    this.applyFirstAction(craft);
    this.applyActions(craft);

    console.log(this.result);
    console.timeEnd('Function Execution Time');
  }

  applyFirstAction(craft: CraftState): void {}

  applyActions(craft: CraftState): void {
    // filter actions
    let craftActions;
    craftActions = this.removeActions(craft, SKILLS);

    for (let action of craftActions) {
      let newCraft = deepCopy(craft);

      action.progress(newCraft);

      if (
        newCraft.currentProgress >= newCraft.progress &&
        newCraft.currentQuality >= newCraft.quality
      ) {
        console.log([
          'ok',
          `${newCraft.time}/${this.maxTime}`,
          newCraft.craftActions,
        ]);
        this.maxTime = newCraft.time;
        this.result = newCraft;
        break;
      } else {
        this.applyActions(newCraft);
      }
    }
  }

  /**
   * Remove actions that can't be used
   * @param currentCraft current craft state
   * @param craftActions actions to filter
   * @returns filtered actions
   */
  private removeActions(
    currentCraft: CraftState,
    craftActions: Skill[]
  ): Skill[] {
    /**
     * BUFFS
     */

    /**
     * Quality
     */
    const isQualityActive =
      currentCraft.currentQuality > 0 &&
      currentCraft.currentQuality < currentCraft.quality;

    if (isQualityActive) {
      craftActions = craftActions.filter(
        (action) =>
          QUALITY_SKILLS_NAMES.includes(action.name) ||
          QUALITY_BONUS_SKILLS_NAMES.includes(action.name) ||
          REPAIR_SKILLS_NAMES.includes(action.name) ||
          DURABILITY_BONUS_SKILLS_NAMES.includes(action.name)
      );
    }

    /**
     * Durability
     */
    if (currentCraft.currentDurability <= 5) {
      craftActions = craftActions.filter(
        (action) => !QUALITY_SKILLS_NAMES.includes(action.name)
      );
    }
    if (currentCraft.currentDurability <= 10) {
      craftActions = craftActions.filter(
        (action) =>
          !QUALITY_SKILLS_NAMES.includes(action.name) ||
          action.name === 'Ouvrage parcimonieux'
      );
    }
    if (currentCraft.currentDurability <= 20) {
      craftActions = craftActions.filter(
        (action) => action.name !== 'Ouvrage préparatoire'
      );
    }

    /**
     * Veneration
     */
    const lastVeneIndex = currentCraft.craftActions.lastIndexOf('Vénération');
    const skillsAfterVene = currentCraft.craftActions.slice(lastVeneIndex + 1);
    if (
      currentCraft.buffs.veneration > 0 &&
      skillsAfterVene.every((skill) => !PROGRESS_SKILLS_NAMES.includes(skill))
    ) {
      craftActions = craftActions.filter(
        (action) =>
          PROGRESS_SKILLS_NAMES.includes(action.name) ||
          REPAIR_SKILLS_NAMES.includes(action.name) ||
          DURABILITY_BONUS_SKILLS_NAMES.includes(action.name)
      );
    }

    /**
     * Timing
     */
    // if (currentCraft.time >= this.maxTime - 3) {
    //   craftActions = [];
    // }

    if (currentCraft.time >= this.maxTime - 3) {
      craftActions = [];
    }

    if (currentCraft.time >= this.maxTime - 5) {
      craftActions = craftActions.filter((action) =>
        PROGRESS_SKILLS_NAMES.includes(action.name)
      );
    }

    if (currentCraft.time >= this.maxTime - 6) {
      craftActions = craftActions.filter(
        (action) =>
          PROGRESS_SKILLS_NAMES.includes(action.name) ||
          PROGRESS_BONUS_SKILLS_NAMES.includes(action.name) ||
          REPAIR_SKILLS_NAMES.includes(action.name) ||
          DURABILITY_BONUS_SKILLS_NAMES.includes(action.name)
      );
    }

    /**
     * Benediction de Byregot
     */
    if (currentCraft.bene) {
      craftActions = craftActions.filter(
        (action) =>
          PROGRESS_SKILLS_NAMES.includes(action.name) ||
          PROGRESS_BONUS_SKILLS_NAMES.includes(action.name) ||
          REPAIR_SKILLS_NAMES.includes(action.name) ||
          DURABILITY_BONUS_SKILLS_NAMES.includes(action.name)
      );
    }

    // dont use veneration if it's already active
    if (currentCraft.buffs.veneration > 0) {
      craftActions = craftActions.filter(
        (action) => action.name !== 'Vénération'
      );
    }

    // dont use manipulation if it's already active
    if (currentCraft.buffs.manipulation > 0) {
      craftActions = craftActions.filter(
        (action) => action.name !== 'Manipulation'
      );
    }

    // dont use innovation if it's already active
    if (currentCraft.buffs.innovation > 0) {
      craftActions = craftActions.filter(
        (action) => action.name !== 'Innovation'
      );
    }

    // dont use Grands progres if it's already active
    if (currentCraft.buffs.grandsProgres > 0) {
      craftActions = craftActions.filter(
        (action) => action.name !== 'Grands progrès'
      );
    }

    // use ouvrage or travail attentif
    if (currentCraft.buffs.observation > 0) {
      craftActions = craftActions.filter(
        (action) =>
          action.name === 'Ouvrage attentif' ||
          action.name === 'Travail attentif'
      );
    }

    // do not use réparation de maître if durability is less than 30 from max
    if (currentCraft.currentDurability > currentCraft.durability - 25) {
      craftActions = craftActions.filter(
        (action) => action.name !== 'Réparation de maître'
      );
    }

    /** OTHERS */

    // use ouvrage combo if possible
    if (currentCraft.buffs.ouvrageDeBase > 0) {
      craftActions = craftActions.filter(
        (action) => action.name !== 'Ouvrage de base'
      );
    }
    if (currentCraft.buffs.ouvrageStandard > 0) {
      craftActions = craftActions.filter(
        (action) =>
          action.name !== 'Ouvrage standard' &&
          action.name !== 'Ouvrage de base'
      );
    }

    // remove actions that can't be used if parcimmonie/parcimonie pérenne is active
    if (
      currentCraft.buffs.parcimonie > 0 ||
      currentCraft.buffs.parcimoniePerenne > 0
    ) {
      craftActions = craftActions.filter(
        (action) =>
          !action.noParcimonie &&
          action.name !== 'Parcimonie' &&
          action.name !== 'Parcimonie pérenne'
      );
    }

    // remove actions that can't be used if observation is not active
    if (currentCraft.buffs.observation === 0) {
      craftActions = craftActions.filter((action) => !action.observationOnly);
    }

    // remove actions that can't be used if IQ is not active
    if (currentCraft.iq === 0) {
      craftActions = craftActions.filter((action) => !action.iqOnly);
    }

    // remove actions that should only be used if IQ is at max
    if (currentCraft.iq < 10) {
      craftActions = craftActions.filter((action) => !action.iqMaxOnly);
    }

    // remove actions that can't be used if PS cost is higher than current PS
    craftActions = craftActions.filter(
      (action) => action.psCost(currentCraft) < currentCraft.ps
    );

    return craftActions;
  }

  simProgress(craft: CraftState, skill: Skill): number {
    let newCraft = deepCopy(craft);
    skill.progress(newCraft);
    return newCraft.currentProgress;
  }

  test() {
    const craft = this.initCraft();
    let skills = [
      deepCopy(veritableValeur),
      // deepCopy(travailPrudent),
      // deepCopy(ouvrageDeBase),
      // deepCopy(ouvrageAvance),
      // deepCopy(ouvrageAttentif),
      // deepCopy(ouvrageParcimonieux),
      // deepCopy(benedictionDeByregot),
      deepCopy(ouvragePreparatoire),
      deepCopy(ouvragePreparatoire),
      deepCopy(ouvragePreparatoire),
      deepCopy(ouvragePreparatoire),
    ];
    this.applyBuffs(craft, skills);
    console.log('prog: ', this.progress(craft, skills));
    console.log('qual: ', this.quality(craft, skills));
    console.log('dur: ', this.durability(craft, skills));
    console.log('ps: ', this.ps(craft, skills));
    console.log(skills.map((s) => s.name));
  }

  /**
   * Calculate the progress
   * @param craft craft state
   * @param skills list of skills
   * @returns progress
   */
  private progress(craft: CraftState, skills: NewSkill[]): number {
    const p1 = (craft.craftmanship * 10) / craft.progDiv + 2;
    const p2 = craft.clvl <= craft.rlvl ? craft.progMod / 100 : 1;
    const p = Math.floor(p1 * p2);

    let progress = 0;
    skills.forEach((skill, i) => {
      if (skill.type === 'p') {
        progress += Math.floor((p * this.progEfficiency(skill)) / 100);
      }
    });
    return progress;
  }

  /**
   * Calculate the efficiency of a progress skill
   * @param skill skill
   * @param i index of the skill in the rotation
   * @param craft craft state
   * @param skills list of skills
   * @returns efficiency
   */
  private progEfficiency(skill: NewSkill): number {
    return skill.efficiency * (1 + skill.xMem + skill.xVen / 2);
  }

  /**
   * Calculate the quality progress
   * @param craft craft state
   * @param skills list of skills
   * @returns quality progress
   */
  private quality(craft: CraftState, skills: NewSkill[]): number {
    const q1 = (craft.control * 10) / craft.qualDiv + 35;
    const q2 = craft.clvl <= craft.rlvl ? craft.qualMod / 100 : 1;
    const q = Math.floor(q1 * q2);

    let iq = 0;

    // if main preste is in the rotation, return 100% quality
    if (skills.some((s) => s.name === 'Main preste')) {
      return craft.quality;
    }

    let quality = 0;
    for (let skill of skills) {
      if (skill.type === 'q') {
        // apply efficiency bonus for Byregot's Blessing and reset IQ
        if (skill.name !== 'Bénédiction de Byregot') {
          quality += Math.floor((q * this.qualEfficiency(skill, iq)) / 100);
          iq = iq + skill.iq < 10 ? iq + skill.iq : 10;
        } else {
          skill.efficiency += 20 * iq;
          quality += Math.floor((q * this.qualEfficiency(skill, iq)) / 100);
          iq = 0;
        }
      }
    }
    return quality;
  }

  /**
   * Calculate the efficiency of a quality skill
   * @param skill skill
   * @param iq IQ
   * @returns efficiency
   */
  private qualEfficiency(skill: NewSkill, iq: number): number {
    return skill.efficiency * (1 + iq / 10) * (1 + skill.xGP + skill.xInno / 2);
  }

  /**
   * Calculate the remaining durability
   * @param craft craft state
   * @param skills list of skills
   * @returns remaining durability
   */
  private durability(craft: CraftState, skills: NewSkill[]): number {
    let durability = 0;
    for (let i = 0; i < skills.length; i++) {
      let skill = skills[i];

      // stop the loop if durability is negative before the end of the rotation
      if (craft.durability < durability) {
        durability = craft.durability + 1;
        break;
      }

      if (skill.name !== 'Réparation de maître') {
        durability += skill.durCost;
      } else {
        // restore durability when réparation de maître is used
        durability = durability < 30 ? 0 : durability - 30;
      }
    }
    return craft.durability - durability;
  }

  /**
   * Calculate the remaining PS
   * @param craft craft state
   * @param skills list of skills
   * @returns remaining PS
   */
  private ps(craft: CraftState, skills: NewSkill[]): number {
    let ps = 0;
    skills.forEach((skill) => {
      ps += skill.psCost;
    });
    return craft.ps - ps;
  }

  /**
   * Apply buffs / bonus combos to the skills
   * @param skills list of skills
   */
  private applyBuffs(craft: CraftState, skills: NewSkill[]): void {
    skills.forEach((skill, i) => {
      // apply veneration buff on the next 4 progress skills
      if (skill.name === 'Vénération') {
        const endIndex = Math.min(i + 5, skills.length);
        for (let j = i + 1; j < endIndex; j++) {
          if (skills[j].type === 'p') {
            skills[j].xVen = 1;
          }
        }
      }

      // apply mémoire musculaire buff on the next progress skill
      else if (skill.name === 'Mémoire musculaire') {
        const endIndex = Math.min(6, skills.length);
        const subArr = skills.slice(1, endIndex);
        const s = subArr.find((s) => s.type === 'p');
        if (s) {
          s.xMem = 1;
        }
      }

      // change eff of travail preparatoire if durability is less than 20
      else if (
        skill.name === 'Travail préparatoire' &&
        this.durability(craft, skills.slice(0, i)) < 20
      ) {
        skill.efficiency = 180;
      }

      // reduce PS cost of ouvrage standard if preceded by ouvrage de base
      else if (
        skill.name === 'Ouvrage standard' &&
        skills[i - 1].name === 'Ouvrage de base'
      ) {
        skill.psCost = 18;
      }

      // reduce PS cost of ouvrage avancé if preceded by ouvrage standard
      else if (
        skill.name === 'Ouvrage avancé' &&
        skills[i - 1].name === 'Ouvrage standard'
      ) {
        skill.psCost = 18;
      }
    });
  }

  /**
   * Initialize the craft state
   * @returns CraftState
   */
  private initCraft(): CraftState {
    return {
      name: this.xivService.recipe()?.Name_fr ?? '',
      progress: this.xivService.difficulty(),
      quality: this.xivService.quality(),
      durability: this.xivService.durability(),
      craftLevel: this.xivService.recipe()?.RecipeLevelTable.ClassJobLevel ?? 0,
      rlvl: this.xivService.recipe()?.RecipeLevelTable.ID ?? 0,
      playerLevel: this.playerStats().level,
      clvl: CLVL[this.playerStats().level as keyof typeof CLVL],
      progDiv: this.xivService.recipe()?.RecipeLevelTable.ProgressDivider ?? 0,
      progMod: this.xivService.recipe()?.RecipeLevelTable.ProgressModifier ?? 0,
      qualDiv: this.xivService.recipe()?.RecipeLevelTable.QualityDivider ?? 0,
      qualMod: this.xivService.recipe()?.RecipeLevelTable.QualityModifier ?? 0,
      craftmanship: this.playerStats().craftmanship,
      control: this.playerStats().control,
      ps: this.playerStats().ps,
      step: 1,
      craftActions: [],
      time: 0,
      currentProgress: 0,
      currentDurability: this.xivService.durability(),
      currentQuality: 0,
      state: [],
      buffs: {
        memoireMusculaire: 0,
        parcimonie: 0,
        parcimoniePerenne: 0,
        veneration: 0,
        manipulation: 0,
        grandsProgres: 0,
        innovation: 0,
        observation: 0,
        ouvrageDeBase: 0,
        ouvrageStandard: 0,
      },
      iq: 0,
      bene: false,
    };
  }
}
