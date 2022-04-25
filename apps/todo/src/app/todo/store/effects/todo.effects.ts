import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { TodoService } from '../../todo.service';
import { TodoActions, TodoApiActions } from '../actions';

@Injectable()
export class TodoEffects {
  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getItems),
      concatMap(() =>
        this.todoService
          .getItems()
          .pipe(map((items) => TodoApiActions.getItemsSuccess({ items })))
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
