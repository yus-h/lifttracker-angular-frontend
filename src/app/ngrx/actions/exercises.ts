import { Action } from '@ngrx/store';

export enum ExerciseActionTypes {

  GetExercises = '[ExerciseActionTypes] Get exercises',
  GetExercisesSuccess = '[ExerciseActionTypes] Get exercises success',
  GetExercisesFailed = '[ExerciseActionTypes] Get exercises failed',

  ResetPaging = '[ExerciseActionTypes] Reset Paging',

  GetAllMuscleGroups = '[ExerciseActionTypes] Get All muscle groups',
  GetAllMuscleGroupsSuccess = '[ExerciseActionTypes] Get All muscle groups success',
  GetAllMuscleGroupsFailed = '[ExerciseActionTypes] Get All muscle groups failed',

  SetFilterMuscleActionGroups = '[ExerciseActionTypes] Set Filter Muscle Action Groups',

}


export class GetExercises implements Action {
  readonly type = ExerciseActionTypes.GetExercises;

  constructor(public payload: any) {
  }
}

export class GetExercisesSuccess implements Action {
  readonly type = ExerciseActionTypes.GetExercisesSuccess;

  constructor(public payload: any) {
  }
}

export class GetExercisesFailed implements Action {
  readonly type = ExerciseActionTypes.GetExercisesFailed;

  constructor(public payload: any) {
  }
}

export class ResetPaging implements Action {
  readonly type = ExerciseActionTypes.ResetPaging;

  constructor() {
  }
}


export class GetAllMuscleGroups implements Action {
  readonly type = ExerciseActionTypes.GetAllMuscleGroups;

  constructor() {
  }
}

export class GetAllMuscleGroupsSuccess implements Action {
  readonly type = ExerciseActionTypes.GetAllMuscleGroupsSuccess;

  constructor(public payload: any) {
  }
}

export class GetAllMuscleGroupsFailed implements Action {
  readonly type = ExerciseActionTypes.GetAllMuscleGroupsFailed;

  constructor(public payload: any) {
  }
}

export class SetFilterMuscleActionGroups implements Action {
  readonly type = ExerciseActionTypes.SetFilterMuscleActionGroups;

  constructor(public payload: any[]) { // ids
  }
}

export type ExerciseActionsUnion =
  | GetExercises
  | GetExercisesSuccess
  | GetExercisesFailed

  | ResetPaging


  | GetAllMuscleGroups
  | GetAllMuscleGroupsSuccess
  | GetAllMuscleGroupsFailed


  | SetFilterMuscleActionGroups;
