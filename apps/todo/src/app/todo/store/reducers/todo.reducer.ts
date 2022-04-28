import { createReducer, on } from '@ngrx/store';
import { TodoActions, TodoApiActions } from '../actions';
import { TodoState } from '../state';
import { TodoUtils } from '../../todo.utils';

const initialState: TodoState = {
  items: [],
  editingItem: null,
  loading: false,
};

export const todoReducer = createReducer(
  initialState,
  //Get items
  on(TodoActions.getItems, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.getItemsSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    items: items,
  })),
  // Create item
  on(TodoActions.createItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.createItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    loading: false,
  })),
  // Update item
  on(TodoActions.openItemEditor, (state, { id }) => ({
    ...state,
    editingItem: id,
  })),
  on(TodoActions.updateItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.updateItemSuccess, (state, { item }) => ({
    ...state,
    items: TodoUtils.replaceItem(state.items, item),
    loading: false,
  })),
  //Delete item
  on(TodoActions.deleteItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.deleteItemSuccess, (state, { response }) => ({
    ...state,
    items: TodoUtils.removeItem(state.items, response.itemId),
    loading: false,
  }))
);
