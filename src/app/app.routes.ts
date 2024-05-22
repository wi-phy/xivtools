import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'craft',
    loadChildren: () => import('./routes/craft.routes').then((m) => m.routes),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
