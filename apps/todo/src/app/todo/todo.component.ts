import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from './store/actions';
import { TodoSelectors } from './store/selectors';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TodoComponent implements OnInit {
  constructor(private store: Store) {}

  items$ = this.store.select(TodoSelectors.selectItems);
  itemInEditing$ = this.store.select(TodoSelectors.selectEditingItem);

  ngOnInit(): void {
    this.store.dispatch(TodoActions.getItems());
  }

  onAddItem(description: string) {
    this.store.dispatch(TodoActions.createItem({ description }));
  }

  onDeleteItem(id: number) {
    this.store.dispatch(TodoActions.deleteItem({ id }));
  }

  onOpenEditor(id: number) {
    this.store.dispatch(TodoActions.openItemEditor({ id }));
  }

  onCheckItem(item: { id: number; checked: boolean }) {
    this.store.dispatch(
      TodoActions.updateItem({ id: item.id, done: item.checked })
    );
  }

  onCancelEdit() {
    this.store.dispatch(TodoActions.cancelEditItem());
  }

  onSaveEdit(item: { id: number; description: string }) {
    this.store.dispatch(TodoActions.updateItem(item));
  }
}
