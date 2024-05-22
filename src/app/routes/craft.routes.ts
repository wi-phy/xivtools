import { Routes } from '@angular/router';
import { OptimizeComponent } from '../components/craft/optimize/optimize.component';
import { SimulationComponent } from '../components/craft/simulation/simulation.component';

export const routes: Routes = [
  {
    path: 'optimize',
    component: OptimizeComponent,
  },
  {
    path: 'simulation',
    component: SimulationComponent,
  },
];
