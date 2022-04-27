import { createAction, props } from '@ngrx/store';
import { SigninRequest, SignupRequest } from '@todo/api-interfaces';

export const signIn = createAction(
  '[Signin Page] Sign in',
  props<{ payload: SigninRequest }>()
);

export const signUp = createAction(
  '[Signup Page] Sign up',
  props<{ payload: SignupRequest }>()
);

export const signOut = createAction('[Toolbar] Sign out');
