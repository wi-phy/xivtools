import { Routes } from '@angular/router';
import { OptimizeComponent } from './optimize/optimize.component';
import { SimulationComponent } from './simulation/simulation.component';

export const routes: Routes = [
  {
    path: 'optimize',
    loadChildren: () =>
      import('./optimize/optimize.routes').then((m) => m.routes),
  },
  {
    path: 'simulation',
    component: SimulationComponent,
  },
];
