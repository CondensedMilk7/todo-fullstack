import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DecodedToken } from '@todo/api-interfaces';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../auth.service';
import { AuthActions, AuthApiActions } from '../actions';

@Injectable()
export class AuthEffects {
  signin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      concatMap(({ payload }) =>
        this.authService.signin(payload).pipe(
          map((response) => {
            const token = response.access_token;
            const decodedToken = this.decodeToken(token);
            this.saveUserData(decodedToken);
            return AuthApiActions.signinSuccess({ decodedToken });
          }),
          catchError(({ error }) => {
            this.snackBar.open(error.message || error.error);
            return of(AuthApiActions.signinFail({ response: error }));
          })
        )
      )
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      concatMap(({ payload }) =>
        this.authService.signup(payload).pipe(
          map((response) => {
            const token = response.access_token;
            const decodedToken = this.decodeToken(token);
            this.saveUserData(decodedToken);
            return AuthApiActions.signupSuccess({ decodedToken });
          }),
          catchError(({ error }) => {
            this.snackBar.open(error.message || error.error);
            return of(AuthApiActions.signupFail({ response: error }));
          })
        )
      )
    );
  });

  signout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('username');
          localStorage.removeItem('user_id');
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signinSuccess, AuthApiActions.signupSuccess),
        tap(() => {
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  private decodeToken(token: string) {
    localStorage.setItem('access_token', token);
    const decoded = this.jwtService.decodeToken(token) as DecodedToken;
    return decoded;
  }

  private saveUserData(data: DecodedToken) {
    localStorage.setItem('username', data.username);
    localStorage.setItem('user_id', data.userId.toString());
  }

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtHelperService,
    private snackBar: MatSnackBar
  ) {}
}
