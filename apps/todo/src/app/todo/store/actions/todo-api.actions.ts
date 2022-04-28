import { createAction, props } from '@ngrx/store';
import {
  DeleteItemResponse,
  ErrorResponse,
  TodoItem,
} from '@todo/api-interfaces';

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

export const createItemFail = createAction(
  '[Todo Api] Create item failed',
  props<{ response: ErrorResponse }>()
);

export const updateItemSuccess = createAction(
  '[Todo Api] Update item successfully',
  props<{ item: TodoItem }>()
);

export const updateItemFail = createAction(
  '[Todo Api] Update item failed',
  props<{ response: ErrorResponse }>()
);

export const deleteItemSuccess = createAction(
  '[Todo Api] Delete item successfully',
  props<{ response: DeleteItemResponse }>()
);

export const deleteItemFail = createAction(
  '[Todo Api] Delete item failed',
  props<{ response: ErrorResponse }>()
);
