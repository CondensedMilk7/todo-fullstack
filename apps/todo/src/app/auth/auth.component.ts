import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SigninRequest } from '@todo/api-interfaces';
import { AuthService } from './auth.service';
import { AuthActions } from './store/actions';
import { AuthSelectors } from './store/selectors';

@Component({
  selector: 'todo-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  // selectors
  loading$ = this.store.select(AuthSelectors.selectLoading);
  error$ = this.store.select(AuthSelectors.selectError);

  // Initialize form groups

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private store: Store) {}

  onSignin() {
    console.log(this.signinForm.value);
    this.store.dispatch(
      AuthActions.signIn({ payload: this.signinForm.value as SigninRequest }) // Type anotation just to be explicit
    );
  }

  onSignup() {
    this.store.dispatch(
      AuthActions.signIn({ payload: this.signinForm.value as SigninRequest })
    );
  }
}
