import { createReducer, on } from '@ngrx/store';
import { TodoActions, TodoApiActions } from '../actions';
import { TodoState } from '../state';
import { TodoUtils } from '../../todo.utils';

const initialState: TodoState = {
  items: {
    all: [],
    active: [],
    done: [],
  },
  editingItem: null,
  loading: false,
};

export const todoReducer = createReducer(
  initialState,
  //Get items
  on(TodoActions.getItems, (state): TodoState => ({ ...state, loading: true })),
  on(
    TodoApiActions.getItemsSuccess,
    (state, { items }): TodoState => ({
      ...state,
      loading: false,
      items: TodoUtils.filterItems(items),
    })
  ),
  // Create item
  on(
    TodoActions.createItem,
    (state): TodoState => ({ ...state, loading: true })
  ),
  on(
    TodoApiActions.createItemSuccess,
    (state, { item }): TodoState => ({
      ...state,
      items: TodoUtils.filterItems([...state.items.all, item]),
      loading: false,
    })
  ),
  // Update item
  on(
    TodoActions.openItemEditor,
    (state, { id }): TodoState => ({
      ...state,
      editingItem: id,
    })
  ),
  on(
    TodoActions.cancelEditItem,
    (state): TodoState => ({
      ...state,
      editingItem: null,
    })
  ),
  on(
    TodoActions.updateItem,
    (state): TodoState => ({ ...state, loading: true })
  ),
  on(TodoApiActions.updateItemSuccess, (state, { item }) => ({
    ...state,
    items: TodoUtils.filterItems(TodoUtils.replaceItem(state.items.all, item)),
    loading: false,
    editingItem: null,
  })),
  //Delete item
  on(
    TodoActions.deleteItem,
    (state): TodoState => ({ ...state, loading: true })
  ),
  on(TodoApiActions.deleteItemSuccess, (state, { response }) => ({
    ...state,
    items: TodoUtils.filterItems(
      TodoUtils.removeItem(state.items.all, response.itemId)
    ),
    loading: false,
  }))
);
