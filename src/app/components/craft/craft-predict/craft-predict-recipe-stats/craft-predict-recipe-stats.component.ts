import { Component, computed, inject } from '@angular/core';
import { XivapiService } from '../../../../services/xivapi.service';

@Component({
  selector: 'app-craft-predict-recipe-stats',
  standalone: true,
  imports: [],
  templateUrl: './craft-predict-recipe-stats.component.html',
  styleUrl: './craft-predict-recipe-stats.component.scss',
})
export class CraftPredictRecipeStatsComponent {
  xivapiService = inject(XivapiService);

  recipe = this.xivapiService.recipe;
  difficulty = this.xivapiService.difficulty;
  quality = this.xivapiService.quality;
  durability = this.xivapiService.durability;
}
