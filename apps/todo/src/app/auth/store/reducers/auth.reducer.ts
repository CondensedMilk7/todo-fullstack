import { createReducer, on } from '@ngrx/store';
import { AuthUtils } from '../../auth.utils';
import { AuthActions, AuthApiActions } from '../actions';
import { AuthState } from '../state/';

const initialState: AuthState = {
  authenticated: AuthUtils.checkToken(),
  error: '',
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  // Signin
  on(AuthActions.signIn, (state) => ({ ...state, loading: true })),
  on(AuthApiActions.signinSuccess, (state) => ({
    ...state,
    loading: false,
    authenticated: AuthUtils.checkToken(),
  })),
  // Signup
  on(AuthActions.signUp, (state) => ({ ...state, loading: true })),
  on(AuthApiActions.signinSuccess, (state) => ({
    ...state,
    loading: false,
    authenticated: AuthUtils.checkToken(),
  }))
);
