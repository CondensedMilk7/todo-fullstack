import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

export const appRoutes: Routes = [
  { path: '', component: TodoComponent, pathMatch: 'full' },
];
