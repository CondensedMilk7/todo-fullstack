import { TodoItem } from '@todo/api-interfaces';

export interface TodoState {
  items: TodoItem[];
  editingItem: number | null;
  loading: boolean;
}
