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

  public static filterItems(items: TodoItem[]) {
    // Assign to an accessable memory reference
    const itemsToFIlter = [...items];
    // Reversed to keep newest at the top
    const itemsReversed = itemsToFIlter.reverse();
    return {
      all: itemsReversed,
      done: itemsReversed.filter((i) => i.done === true),
      active: itemsReversed.filter((i) => i.done === false),
    };
  }
}
