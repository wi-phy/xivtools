import { Component, inject } from '@angular/core';
import { XivapiService } from '../../../../services/xivapi.service';
import { ActivatedRoute } from '@angular/router';
import { OptimizeRecipeStatsComponent } from '../optimize-recipe-stats/optimize-recipe-stats.component';
import { OptimizePlayerStatsComponent } from '../optimize-player-stats/optimize-player-stats.component';

@Component({
  selector: 'app-optimize-recipe',
  standalone: true,
  imports: [OptimizeRecipeStatsComponent, OptimizePlayerStatsComponent],
  templateUrl: './optimize-recipe.component.html',
  styleUrl: './optimize-recipe.component.scss',
})
export class OptimizeRecipeComponent {
  private xivService = inject(XivapiService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) this.xivService.recipeId.set(recipeId);
  }
}
