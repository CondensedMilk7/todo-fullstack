import { createAction, props } from '@ngrx/store';
import { DecodedToken, ErrorResponse } from '@todo/api-interfaces';

export const signupSuccess = createAction(
  '[Auth Api] Signup successful',
  props<{ decodedToken: DecodedToken }>()
);
export const signinSuccess = createAction(
  '[Auth Api] Signin Successful',
  props<{ decodedToken: DecodedToken }>()
);
export const signupFail = createAction(
  '[Auth Api] Signup failed',
  props<{ response: ErrorResponse }>()
);
export const signinFail = createAction(
  '[Auth Api] Signin failed',
  props<{ response: ErrorResponse }>()
);
