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
