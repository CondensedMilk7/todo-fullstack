import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItem } from '@todo/api-interfaces';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() item!: TodoItem;
}
