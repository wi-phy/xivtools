import { Injectable, inject, signal } from '@angular/core';
import { PlayerStats } from '../models/player-stats';
import { CLVL } from '../const/clvl';
import { XivapiService } from './xivapi.service';
import {
  SKILLS,
  benedictionDeByregot,
  manipulation,
  memoireMusculaire,
  observation,
  ouvrageAttentif,
  ouvrageAvance,
  ouvrageDeBase,
  ouvrageParcimonieux,
  ouvrageStandard,
  parcimonie,
  parcimoniePerenne,
  reparationDeMaitre,
  travailAttentif,
  travailDeBase,
  travailPrudent,
  veneration,
} from '../const/skills';
import { CraftState } from '../models/craft-state';
import { Skill } from '../models/skill';

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

  steps: CraftState[] = [];

  predict(): void {
    this.steps = [];

    const craft = this.initCraft();

    let craftActions = SKILLS;
    let currentCraft = { ...craft };
    this.steps.push({ ...currentCraft });

    ouvrageDeBase.progress(currentCraft);
    this.steps.push({ ...currentCraft });
    observation.progress(currentCraft);
    this.steps.push({ ...currentCraft });
    ouvrageAttentif.progress(currentCraft);
    this.steps.push({ ...currentCraft });
    ouvrageParcimonieux.progress(currentCraft);
    this.steps.push({ ...currentCraft });

    // while (
    //   currentCraft.progress > currentCraft.currentProgress &&
    //   currentCraft.currentDurability > 0
    // ) {
    //   craftActions = this.removeActions(currentCraft, SKILLS);

    //   craftActions[0].progress(currentCraft);
    //   this.steps.push({ ...currentCraft });
    // }
  }

  private removeActions(
    currentCraft: CraftState,
    craftActions: Skill[]
  ): Skill[] {
    // remove actions that can't be used after first step
    if (currentCraft.step >= 2) {
      craftActions = craftActions.filter((action) => !action.firstStepOnly);
    }

    // remove actions that can't be used if parcimmonie/parcimonie pérenne is active
    if (
      currentCraft.buffs.parcimonie > 0 ||
      currentCraft.buffs.parcimoniePerenne > 0
    ) {
      craftActions = craftActions.filter((action) => !action.noParcimonie);
    }

    // remove actions that can't be used if observation is not active
    if (currentCraft.buffs.observation === 0) {
      craftActions = craftActions.filter((action) => !action.observationOnly);
    }

    // remove actions that can't be used if IQ is not active
    if (currentCraft.iq === 0) {
      craftActions = craftActions.filter((action) => !action.iqOnly);
    }

    // remove actions that can't be used if PS cost is higher than current PS
    craftActions = craftActions.filter(
      (action) => action.psCost(currentCraft) < currentCraft.ps
    );

    return craftActions;
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
      rlvl: this.xivService.recipe()?.RecipeLevelTable.ID ?? 0,
      clvl: CLVL[this.playerStats().level as keyof typeof CLVL],
      progDiv: this.xivService.recipe()?.RecipeLevelTable.ProgressDivider ?? 0,
      progMod: this.xivService.recipe()?.RecipeLevelTable.ProgressModifier ?? 0,
      qualDiv: this.xivService.recipe()?.RecipeLevelTable.QualityDivider ?? 0,
      qualMod: this.xivService.recipe()?.RecipeLevelTable.QualityModifier ?? 0,
      craftmanship: this.playerStats().craftmanship,
      control: this.playerStats().control,
      ps: this.playerStats().ps,
      step: 1,
      craftAction: 'Init',
      time: 0,
      currentProgress: 0,
      currentDurability: this.xivService.durability(),
      currentQuality: 0,
      buffs: {
        memoireMusculaire: 0,
        parcimonie: 0,
        parcimoniePerenne: 0,
        veneration: 0,
        manipulation: 0,
        observation: 0,
        ouvrageDeBase: 0,
        ouvrageStandard: 0,
      },
      iq: 0,
    };
  }
}
