import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ItemComponent } from './components/item/item.component';
import { todoReducer } from './store/reducers';
import { TodoComponent } from './todo.component';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('todo', todoReducer)],
  declarations: [TodoComponent, ItemComponent],
})
export class TodoModule {}
