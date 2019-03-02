import { Action } from '@ngrx/store';

export enum ExerciseActionTypes {

  GetExercises = '[ExerciseTypes] Get exercises',

}


export class GetExercises implements Action {
  readonly type = ExerciseActionTypes.GetExercises;

  constructor(public payload: any) {
  }
}

export type ExerciseActionsUnion =
  | GetExercises;
