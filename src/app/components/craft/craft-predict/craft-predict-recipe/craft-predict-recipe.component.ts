import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { XivapiService } from '../../../../services/xivapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerStats } from '../../../../models/player-stats';
import { CraftPredictRecipeStatsComponent } from '../craft-predict-recipe-stats/craft-predict-recipe-stats.component';
import { CraftPredictPlayerStatsComponent } from '../craft-predict-player-stats/craft-predict-player-stats.component';
import { CraftPredictService } from '../../../../services/craft-predict.service';
import { CraftState } from '../../../../models/craft-state';

@Component({
  selector: 'app-craft-predict-recipe',
  standalone: true,
  imports: [CraftPredictRecipeStatsComponent, CraftPredictPlayerStatsComponent],
  templateUrl: './craft-predict-recipe.component.html',
  styleUrl: './craft-predict-recipe.component.scss',
})
export class CraftPredictRecipeComponent {
  private xivService = inject(XivapiService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private router = inject(Router);
  private craftPredictService = inject(CraftPredictService);

  crafts: CraftState[] = [];
  stats: PlayerStats = {} as PlayerStats;

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) this.xivService.recipeId.set(recipeId);
  }

  setStats(stats: PlayerStats) {
    this.stats = stats;
  }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  debug() {
    this.craftPredictService.predict();
  }

  test() {
    this.craftPredictService.test();
  }
}
