import { Routes } from '@angular/router';
import { OptimizeComponent } from './optimize.component';
import { OptimizeRecipeComponent } from './optimize-recipe/optimize-recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: OptimizeComponent,
  },
  {
    path: ':id',
    component: OptimizeRecipeComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
