import { Component, computed, inject } from '@angular/core';
import { XivapiService } from '../../../../services/xivapi.service';

@Component({
  selector: 'app-optimize-recipe-stats',
  standalone: true,
  imports: [],
  templateUrl: './optimize-recipe-stats.component.html',
  styleUrl: './optimize-recipe-stats.component.scss',
})
export class OptimizeRecipeStatsComponent {
  xivapiService = inject(XivapiService);

  recipe = this.xivapiService.recipe;

  difficulty = computed(() => {
    const recipe = this.recipe();
    return recipe
      ? Math.floor(
          (recipe.RecipeLevelTable.Difficulty * recipe.DifficultyFactor) / 100
        )
      : 0;
  });
  quality = computed(() => {
    const recipe = this.recipe();
    return recipe
      ? Math.floor(
          (recipe.RecipeLevelTable.Quality * recipe.QualityFactor) / 100
        )
      : 0;
  });
  durability = computed(() => {
    const recipe = this.recipe();
    return recipe
      ? Math.floor(
          (recipe.RecipeLevelTable.Durability * recipe.DurabilityFactor) / 100
        )
      : 0;
  });
}
