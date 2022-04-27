import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemComponent } from './components/item/item.component';
import { TodoEffects } from './store/effects';
import { todoReducer } from './store/reducers';
import { TodoComponent } from './todo.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
  declarations: [TodoComponent, ItemComponent],
})
export class TodoModule {}
