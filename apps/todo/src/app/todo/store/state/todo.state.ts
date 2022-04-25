import { TodoItem } from '@todo/api-interfaces';

export interface TodoState {
  items: TodoItem[];
  selectedItemId: number | null;
  loading: boolean;
}
