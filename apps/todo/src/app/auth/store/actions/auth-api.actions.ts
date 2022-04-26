import { createAction, props } from '@ngrx/store';
import { SigninResponse, SignupResponse } from '@todo/api-interfaces';

export const signupSuccess = createAction(
  '[Auth Api] Signup successful',
  props<{ response: SignupResponse }>()
);
export const signinSuccess = createAction(
  '[Auth Api] Signin Successful',
  props<{ response: SigninResponse }>()
);
