import { TodoItem } from '@todo/api-interfaces';

export class TodoUtils {
  public static replaceItem(items: TodoItem[], item: TodoItem) {
    const index = items.findIndex((i) => i.id === item.id);
    const result = [...items];
    result[index] = item;
    return result;
  }

  public static removeItem(items: TodoItem[], id: number) {
    const result = [...items];
    const index = items.findIndex((i) => i.id === id);
    result.splice(index, 1);
    return result;
  }
}
