import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { TodoService } from '../../todo.service';
import { TodoActions, TodoApiActions } from '../actions';

@Injectable()
export class TodoEffects {
  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.getItems),
      concatMap(() =>
        this.todoService.getItems().pipe(
          map((response) =>
            TodoApiActions.getItemsSuccess({ items: response.data })
          ),
          catchError((error) => {
            this.snackbar.open(error.message || error.error);
            return of(TodoApiActions.createItemFail({ response: error }));
          })
        )
      )
    );
  });

  createItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.createItem),
      concatMap(({ description }) =>
        this.todoService.createItem({ description }).pipe(
          map((item) => TodoApiActions.createItemSuccess({ item })),
          catchError((error) => {
            this.snackbar.open(error.message || error.error);
            return of(TodoApiActions.createItemFail({ response: error }));
          })
        )
      )
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.deleteItem),
      concatMap(({ id }) =>
        this.todoService.deleteItem(id).pipe(
          map((response) => TodoApiActions.deleteItemSuccess({ response })),
          catchError((error) => {
            this.snackbar.open(error.message || error.error);
            return of(TodoApiActions.createItemFail({ response: error }));
          })
        )
      )
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.updateItem),
      concatMap((payload) =>
        this.todoService.updateItem(payload).pipe(
          map((item) => TodoApiActions.updateItemSuccess({ item })),
          catchError((error) => {
            this.snackbar.open(error.message || error.error);
            return of(TodoApiActions.createItemFail({ response: error }));
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private snackbar: MatSnackBar
  ) {}
}
