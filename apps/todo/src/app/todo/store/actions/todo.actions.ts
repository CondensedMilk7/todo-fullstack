import { createAction, props } from '@ngrx/store';

export const getItems = createAction('[Todo Page] Get items');

export const createItem = createAction(
  '[Todo Page] Create item',
  props<{ description: string }>()
);

export const updateItem = createAction(
  '[Todo Page] Update item',
  props<{ id: number; description?: string; done?: boolean }>()
);

export const deleteItem = createAction(
  '[Todo Page] Delete item',
  props<{ id: number }>()
);

export const openItemEditor = createAction(
  '[Todo Page] Open item editor',
  props<{ id: number }>()
);
