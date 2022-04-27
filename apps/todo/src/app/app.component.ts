import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth/store/actions';
import { AuthSelectors } from './auth/store/selectors';
import { TodoSelectors } from './todo/store/selectors';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  user$ = this.store.select(AuthSelectors.selectUser);
  authenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  loadingAuth$ = this.store.select(AuthSelectors.selectLoading);
  loadingTodo$ = this.store.select(TodoSelectors.selectLoading);

  constructor(private store: Store) {}

  onSignout() {
    this.store.dispatch(AuthActions.signOut());
  }
}
