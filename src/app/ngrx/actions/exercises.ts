import { Action } from '@ngrx/store';

export enum ExerciseActionTypes {

  GetExercises = '[ExerciseActionTypes] Get exercises',
  GetExercisesSuccess = '[ExerciseActionTypes] Get exercises success',
  GetExercisesFailed = '[ExerciseActionTypes] Get exercises failed',

  ResetPaging = '[ExerciseActionTypes] Reset Paging',

  GetAllMuscleGroups = '[ExerciseActionTypes] Get All muscle groups',
  GetAllMuscleGroupsSuccess = '[ExerciseActionTypes] Get All muscle groups success',
  GetAllMuscleGroupsFailed = '[ExerciseActionTypes] Get All muscle groups failed',

  SaveNewExercise = '[ExerciseActionTypes] Save new exercise',
  SaveNewExerciseSuccess = '[ExerciseActionTypes] Save new exercise success',
  SaveNewExerciseFailed = '[ExerciseActionTypes] Save new exercise failed',
  SaveNewExerciseResetLoadingState = '[ExerciseActionTypes] Save new exercise Reset Loading State',

  UpdateExercise = '[ExerciseActionTypes] Update exercise',
  UpdateExerciseSuccess = '[ExerciseActionTypes] Update exercise success',
  UpdateExerciseFailed = '[ExerciseActionTypes] Update exercise failed',
  UpdateExerciseResetLoadingState = '[ExerciseActionTypes] Update exercise - reset loading state',

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


export class SaveNewExercise implements Action {
  readonly type = ExerciseActionTypes.SaveNewExercise;

  constructor(public payload: any) {
  }
}

export class SaveNewExerciseSuccess implements Action {
  readonly type = ExerciseActionTypes.SaveNewExerciseSuccess;

  constructor(public payload: any) {
  }
}

export class SaveNewExerciseFailed implements Action {
  readonly type = ExerciseActionTypes.SaveNewExerciseFailed;

  constructor(public payload: any) {
  }
}

export class SaveNewExerciseResetLoadingState implements Action {
  readonly type = ExerciseActionTypes.SaveNewExerciseResetLoadingState;

  constructor() {
  }
}


export class UpdateExercise implements Action {
  readonly type = ExerciseActionTypes.UpdateExercise;

  constructor(public payload: any) {
  }
}

export class UpdateExerciseSuccess implements Action {
  readonly type = ExerciseActionTypes.UpdateExerciseSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateExerciseFailed implements Action {
  readonly type = ExerciseActionTypes.UpdateExerciseFailed;

  constructor(public payload: any) {
  }
}

export class UpdateExerciseResetLoadingState implements Action {
  readonly type = ExerciseActionTypes.UpdateExerciseFailed;

  constructor() {
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

  | SaveNewExercise
  | SaveNewExerciseSuccess
  | SaveNewExerciseFailed
  | SaveNewExerciseResetLoadingState

  | UpdateExercise
  | UpdateExerciseSuccess
  | UpdateExerciseFailed
  | UpdateExerciseResetLoadingState

  | SetFilterMuscleActionGroups;
