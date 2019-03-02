import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  ExerciseActionTypes, GetAllMuscleGroups, GetAllMuscleGroupsFailed, GetAllMuscleGroupsSuccess, GetExercises,
  GetExercisesFailed,
  GetExercisesSuccess, SaveNewExercise, SaveNewExerciseFailed, SaveNewExerciseSuccess, UpdateExercise,
  UpdateExerciseFailed,
  UpdateExerciseSuccess
} from '../actions/exercises';
import { ApiService } from '../../core/services/ApiService';
import * as fromRoot from '../index';


@Injectable()
export class ExerciseEffects {


  constructor(private actions$: Actions,
              private apiService: ApiService,
              private store: Store<fromRoot.State>) {
  }



  @Effect()
  getExercises: Observable<Action> = this.actions$.pipe(
    ofType<GetExercises>(ExerciseActionTypes.GetExercises),
    withLatestFrom(this.store),
    switchMap(([action, storeState]) => {
        return this.apiService.getExercises(
          action.payload,
          storeState.exercises.pageNumber,
          storeState.exercises.filterMuscleGroupsApplied)
          .pipe(
          map((response: any) => {
            return response;
          }),
          map(res => new GetExercisesSuccess(res)),
          catchError(error => of(new GetExercisesFailed(error)))
        )
      }
    )
  );


  @Effect()
  getAllMuscleGroups: Observable<Action> = this.actions$.pipe(
    ofType<GetAllMuscleGroups>(ExerciseActionTypes.GetAllMuscleGroups),
    switchMap(() => {
        return this.apiService.getAllMuscleGroups()
          .pipe(
            map((response: any) => {
              return response;
            }),
            map(res => new GetAllMuscleGroupsSuccess(res)),
            catchError(error => of(new GetAllMuscleGroupsFailed(error)))
          )
      }
    )
  )


  @Effect()
  saveNewExercise: Observable<Action> = this.actions$.pipe(
    ofType<SaveNewExercise>(ExerciseActionTypes.SaveNewExercise),
    switchMap((action) => {
        return this.apiService.saveNewExercise(action.payload)
          .pipe(
            map((response: any) => {
              return response;
            }),
            map(res => new SaveNewExerciseSuccess(res)),
            catchError(error => of(new SaveNewExerciseFailed(error)))
          )
      }
    )
  )

  @Effect()
  updateExercise: Observable<Action> = this.actions$.pipe(
    ofType<UpdateExercise>(ExerciseActionTypes.UpdateExercise),
    switchMap((action) => {
        return this.apiService.updateExercise(action.payload)
          .pipe(
            map((response: any) => {
              console.log('UPDATE RES', response);
              return response;
            }),
            map(res => new UpdateExerciseSuccess(res)),
            catchError(error => of(new UpdateExerciseFailed(error)))
          )
      }
    )
  )







}


