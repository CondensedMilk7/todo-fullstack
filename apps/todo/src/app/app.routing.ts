import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
];
