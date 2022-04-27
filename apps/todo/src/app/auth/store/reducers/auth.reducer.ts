import { createReducer, on } from '@ngrx/store';
import { AuthUtils } from '../../auth.utils';
import { AuthActions, AuthApiActions } from '../actions';
import { AuthState } from '../state/';

const initialState: AuthState = {
  authenticated: AuthUtils.checkToken(),
  error: '',
  loading: false,
  user: {
    username: '',
    id: 0,
  },
  token: {
    iat: 0,
    exp: 0,
  },
};

export const authReducer = createReducer(
  initialState,

  // Signin
  on(AuthActions.signIn, (state) => ({ ...state, loading: true })),
  on(AuthApiActions.signinSuccess, (state, { decodedToken }) => ({
    ...state,
    loading: false,
    authenticated: AuthUtils.checkToken(),
    user: {
      id: decodedToken.userId,
      username: decodedToken.username,
    },
    token: {
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    },
  })),
  on(AuthApiActions.signinFail, (state, { response }) => ({
    ...state,
    loading: false,
    error: response.message,
  })),

  // Signup
  on(AuthActions.signUp, (state) => ({ ...state, loading: true })),
  on(AuthApiActions.signupSuccess, (state, { decodedToken }) => ({
    ...state,
    loading: false,
    authenticated: AuthUtils.checkToken(),
    user: {
      id: decodedToken.userId,
      username: decodedToken.username,
    },
    token: {
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    },
  })),
  on(AuthApiActions.signupFail, (state, { response }) => ({
    ...state,
    loading: false,
    error: response.message,
  })),

  // Signout
  on(AuthActions.signOut, (state) => ({
    ...state,
    authenticated: false,
    user: { username: '', id: 0 },
    token: { iat: 0, exp: 0 },
  }))
);
