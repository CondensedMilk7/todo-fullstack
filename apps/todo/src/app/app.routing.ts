import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { TodoComponent } from './todo/todo.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: TodoComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '' },
];
