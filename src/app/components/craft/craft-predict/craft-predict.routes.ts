import { Routes } from '@angular/router';
import { CraftPredictComponent } from './craft-predict.component';
import { CraftPredictRecipeComponent } from './craft-predict-recipe/craft-predict-recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: CraftPredictComponent,
  },
  {
    path: ':id',
    component: CraftPredictRecipeComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
