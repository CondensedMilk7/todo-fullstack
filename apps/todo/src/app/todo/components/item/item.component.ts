import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoItem } from '@todo/api-interfaces';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ItemComponent implements OnChanges {
  @Input() item!: TodoItem;
  @Input() editingItem!: number | null;
  @Output() openEditor = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() checkItem = new EventEmitter<{ id: number; checked: boolean }>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<{ id: number; description: string }>();

  editing = false;

  ngOnChanges(changes: SimpleChanges): void {
    const editingItem = changes['editingItem'];
    if (editingItem) {
      this.editing = editingItem.currentValue === this.item.id;
    }
  }

  onOpenEditor() {
    this.openEditor.emit(this.item.id);
  }

  onDeleteItem() {
    this.deleteItem.emit(this.item.id);
  }

  onCheckItem({ checked }: MatCheckboxChange) {
    this.checkItem.emit({ id: this.item.id, checked });
  }

  onCancelEdit() {
    this.cancelEdit.emit();
  }

  onSaveEdit(description: string) {
    this.saveEdit.emit({ id: this.item.id, description: description });
  }
}
