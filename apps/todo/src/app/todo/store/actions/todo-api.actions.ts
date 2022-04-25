import { createAction, props } from '@ngrx/store';
import { DeleteItemResponse, TodoItem } from '@todo/api-interfaces';

export const getItemsSuccess = createAction(
  '[Todo Api] Get items successfully',
  props<{
    items: TodoItem[];
  }>()
);

export const createItemSuccess = createAction(
  '[Todo Api] Create item successfully',
  props<{ item: TodoItem }>()
);

export const updateItemSuccess = createAction(
  '[Todo Api] Update item successfully',
  props<{ item: TodoItem }>()
);

export const deleteItemSuccess = createAction(
  '[Todo Api] Delete item successfully',
  props<{ response: DeleteItemResponse }>()
);
