import { Routes } from '@angular/router';
import { SimulationComponent } from './simulation/simulation.component';

export const routes: Routes = [
  {
    path: 'predict',
    loadChildren: () =>
      import('./craft-predict/craft-predict.routes').then((m) => m.routes),
  },
  {
    path: 'simulation',
    component: SimulationComponent,
  },
];
