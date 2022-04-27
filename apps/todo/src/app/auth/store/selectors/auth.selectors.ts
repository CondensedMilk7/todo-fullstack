import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../state';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state) => state.authenticated
);

export const selectError = createSelector(selectAuth, (state) => state.error);

export const selectLoading = createSelector(
  selectAuth,
  (state) => state.loading
);

export const selectUser = createSelector(selectAuth, (state) => state.user);

export const selectToken = createSelector(selectAuth, (state) => state.token);
