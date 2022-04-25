export interface TodoItem {
  id: number;
  description: string;
  done: boolean;
  userId?: number;
}

export interface DeleteItemResponse {
  message: string;
  itemId: number;
}
