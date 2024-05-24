import { Injectable, inject, signal } from '@angular/core';
import { PlayerStats } from '../models/player-stats';
import { CLVL } from '../const/clvl';
import { XivapiService } from './xivapi.service';
import { SKILLS } from '../const/skills';
import { CraftState } from '../models/craft-state';

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

    craftActions[1].progress(currentCraft);
    this.steps.push({ ...currentCraft });
    craftActions[7].progress(currentCraft);
    this.steps.push({ ...currentCraft });
    craftActions[5].progress(currentCraft);
    this.steps.push({ ...currentCraft });
    craftActions[8].progress(currentCraft);
    this.steps.push({ ...currentCraft });
    craftActions[2].progress(currentCraft);
    this.steps.push({ ...currentCraft });
    craftActions[6].progress(currentCraft);
    this.steps.push({ ...currentCraft });

    // while (
    //   currentCraft.progress > currentCraft.currentProgress &&
    //   currentCraft.currentDurability > 0
    // ) {
    //   craftActions = SKILLS;
    //   // remove actions that can't be used after first step
    //   if (currentCraft.step >= 2) {
    //     craftActions = craftActions.filter((action) => !action.firstStepOnly);
    //   }
    //   // remove actions that can't be used because of parcimonie
    //   if (
    //     currentCraft.buffs.parcimonie > 0 ||
    //     currentCraft.buffs.parcimoniePerenne > 0
    //   ) {
    //     craftActions = craftActions.filter((action) => !action.noParcimonie);
    //   }
    //   // remove actions that can't be used because of PS cost
    //   craftActions = craftActions.filter(
    //     (action) => action.psCost < currentCraft.ps
    //   );

    //   craftActions[0].progress(currentCraft);
    //   this.steps.push({ ...currentCraft });
    // }
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
      },
    };
  }
}
