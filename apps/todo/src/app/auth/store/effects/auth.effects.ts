import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DecodedToken, ErrorResponse } from '@todo/api-interfaces';
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
            localStorage.setItem('access_token', token);
            const decodedToken = this.decodeToken(token);
            return AuthApiActions.signinSuccess({ decodedToken });
          }),
          catchError((error: ErrorResponse) =>
            of(AuthApiActions.signinFail({ response: error }))
          )
        )
      )
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      concatMap(({ payload }) =>
        this.authService.signin(payload).pipe(
          map((response) => {
            const token = response.access_token;
            localStorage.setItem('access_token', token);
            const decodedToken = this.decodeToken(token);
            return AuthApiActions.signupSuccess({ decodedToken });
          }),
          catchError((error: ErrorResponse) =>
            of(AuthApiActions.signupFail({ response: error }))
          )
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
          console.log('navigate!');
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  private decodeToken(token: string) {
    const decoded = this.jwtService.decodeToken(token) as DecodedToken;
    return decoded;
  }

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtHelperService
  ) {}
}
