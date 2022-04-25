import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../state';
const selectTodo = createFeatureSelector<TodoState>('todo');

export const selectItems = createSelector(selectTodo, (state) => state.items);
export const selectLoading = createSelector(
  selectTodo,
  (state) => state.loading
);
export const selectSelectedItem = createSelector(
  selectTodo,
  (state) => state.selectedItemId
);
