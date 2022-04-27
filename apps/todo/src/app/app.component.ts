import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth/store/actions';
import { AuthSelectors } from './auth/store/selectors';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.store.select(AuthSelectors.selectUser);
  constructor(private store: Store) {}

  onSignout() {
    this.store.dispatch(AuthActions.signOut());
  }
}
