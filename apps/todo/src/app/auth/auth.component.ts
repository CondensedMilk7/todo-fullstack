import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SigninRequest, SignupRequest } from '@todo/api-interfaces';
import { AuthActions } from './store/actions';
import { AuthSelectors } from './store/selectors';

@Component({
  selector: 'todo-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent {
  minPassLength = 8;
  // selectors
  loading$ = this.store.select(AuthSelectors.selectLoading);
  error$ = this.store.select(AuthSelectors.selectError);

  // Initialize form groups

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minPassLength),
    ]),
  });

  constructor(private store: Store) {}

  onSignin() {
    this.store.dispatch(
      AuthActions.signIn({ payload: this.signinForm.value as SigninRequest }) // Type anotation just to be explicit
    );
  }

  onSignup() {
    this.store.dispatch(
      AuthActions.signUp({ payload: this.signupForm.value as SignupRequest })
    );
  }
}
