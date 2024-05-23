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
  xivService = inject(XivapiService);

  playerStats = signal<PlayerStats>({
    craftmanship: 4065,
    control: 3976,
    level: 90,
    ps: 604,
  });

  steps: CraftState[] = [];

  predict(): void {
    this.steps = [];

    // infos sur le craft à l'instant initial
    const craft = {
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
      time: 0,
      buffs: {
        memoireMusculaire: 0,
      },
    };
    console.log({ ...craft });

    SKILLS[1].progress(craft);
    this.steps.push({ ...craft });

    while (craft.progress > 0 && craft.durability > 0) {
      SKILLS[0].progress(craft);
      this.steps.push({ ...craft });
    }

    console.log(this.steps);
  }
}
