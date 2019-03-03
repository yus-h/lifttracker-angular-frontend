import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  DeleteExercise, DeleteExerciseFailed, DeleteExerciseSuccess,
  ExerciseActionTypes, GetAllMuscleGroups, GetAllMuscleGroupsFailed, GetAllMuscleGroupsSuccess, GetExercises,
  GetExercisesFailed,
  GetExercisesSuccess, GetSingleExercise, GetSingleExerciseFailed, GetSingleExerciseSuccess, SaveNewExercise,
  SaveNewExerciseFailed,
  SaveNewExerciseSuccess,
  UpdateExercise,
  UpdateExerciseFailed,
  UpdateExerciseSuccess
} from '../actions/exercises';
import { ApiService } from '../../core/services/ApiService';
import * as fromRoot from '../index';
import { concatMap } from 'rxjs/internal/operators';


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
  );


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
  );

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
            // TODO why fail being called
            catchError(error => of(new UpdateExerciseFailed(error)))
          )
      }
    )
  )


  @Effect()
  deleteExercise: Observable<Action> = this.actions$.pipe(
    ofType<DeleteExercise>(ExerciseActionTypes.DeleteExercise),
    // ofType<DeleteExercise>(),
    concatMap((action) => {
        return this.apiService.deleteExercise(action.payload)
          .pipe(
            map((response: any) => {
              console.log('UPDATE RES', response);
              return new DeleteExerciseSuccess(response);
            }),
            catchError(error => of(new DeleteExerciseFailed(error)))
          )
      }
    )
  )


  @Effect()
  getSingleExercise: Observable<Action> = this.actions$.pipe(
    ofType<GetSingleExercise>(ExerciseActionTypes.GetSingleExercise),
    // ofType<DeleteExercise>(),
    concatMap((action) => {
        return this.apiService.getSingleExercise(action.payload)
          .pipe(
            map((response: any) => {
              console.log('SUCCESS', response);
              return new GetSingleExerciseSuccess(response);
            }),
            catchError(error => of(new GetSingleExerciseFailed(error)))
          )
      }
    )
  )







}


