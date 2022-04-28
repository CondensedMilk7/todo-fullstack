import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoItem } from '@todo/api-interfaces';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() item!: TodoItem;
  @Output() openEditor = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() checkItem = new EventEmitter<{ id: number; checked: boolean }>();

  onOpenEditor() {
    this.openEditor.emit(this.item.id);
  }

  onDeleteItem() {
    this.deleteItem.emit(this.item.id);
  }

  onCheckItem({ checked }: MatCheckboxChange) {
    this.checkItem.emit({ id: this.item.id, checked });
  }
}
