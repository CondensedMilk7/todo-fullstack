import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
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

  ngOnInit(): void {}
}
