import { TodoItem } from '@todo/api-interfaces';

export interface TodoState {
  items: {
    all: TodoItem[];
    active: TodoItem[];
    done: TodoItem[];
  };
  editingItem: number | null;
  loading: boolean;
}
