import { Action } from '@ngrx/store';

export enum ExerciseActionTypes {

  GetExercises = '[ExerciseActionTypes] Get exercises',
  GetExercisesSuccess = '[ExerciseActionTypes] Get exercises success',
  GetExercisesFailed = '[ExerciseActionTypes] Get exercises failed',

  GetSingleExercise = '[ExerciseActionTypes] Get Single Exercise',
  GetSingleExerciseSuccess = '[ExerciseActionTypes] Get Single Exercise Success',
  GetSingleExerciseFailed = '[ExerciseActionTypes] Get Single Exercise Failed',
  GetSingleExerciseResetLoadingState = '[ExerciseActionTypes] Get Single Exercise Reset Loading State',

  ResetSingleExercise = '[ExerciseActionTypes] Reset Single Exercise',

  ResetPaging = '[ExerciseActionTypes] Reset Paging',

  GetAllMuscleGroups = '[ExerciseActionTypes] Get All muscle groups',
  GetAllMuscleGroupsSuccess = '[ExerciseActionTypes] Get All muscle groups success',
  GetAllMuscleGroupsFailed = '[ExerciseActionTypes] Get All muscle groups failed',

  SaveNewExercise = '[ExerciseActionTypes] Save new exercise',
  SaveNewExerciseSuccess = '[ExerciseActionTypes] Save new exercise success',
  SaveNewExerciseFailed = '[ExerciseActionTypes] Save new exercise failed',
  SaveNewExerciseResetLoadingState = '[ExerciseActionTypes] Save new exercise Reset Loading State',


  DeleteExercise = '[ExerciseActionTypes] Delete exercise',
  DeleteExerciseSuccess = '[ExerciseActionTypes] Delete exercise success',
  DeleteExerciseFailed = '[ExerciseActionTypes] Delete exercise failed',
  DeleteExerciseResetLoadingState = '[ExerciseActionTypes] Delete exercise Reset Loading State',


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

export class GetSingleExercise implements Action {
  readonly type = ExerciseActionTypes.GetSingleExercise;

  constructor(public payload: any) {
  }
}

export class GetSingleExerciseSuccess implements Action {
  readonly type = ExerciseActionTypes.GetSingleExerciseSuccess;

  constructor(public payload: any) {
  }
}

export class GetSingleExerciseFailed implements Action {
  readonly type = ExerciseActionTypes.GetSingleExerciseFailed;

  constructor(public payload: any) {
  }
}

export class GetSingleExerciseResetLoadingState implements Action {
  readonly type = ExerciseActionTypes.GetSingleExerciseResetLoadingState;

  constructor(public payload: any) {
  }
}


export class ResetSingleExercise implements Action {
  readonly type = ExerciseActionTypes.ResetSingleExercise;

  constructor() {
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
  readonly type = ExerciseActionTypes.UpdateExerciseResetLoadingState;

  constructor() {
  }
}




export class DeleteExercise implements Action {
  readonly type = ExerciseActionTypes.DeleteExercise;

  constructor(public payload: any) {
  }
}

export class DeleteExerciseSuccess implements Action {
  readonly type = ExerciseActionTypes.DeleteExerciseSuccess;

  constructor(public payload: any) {
  }
}

export class DeleteExerciseFailed implements Action {
  readonly type = ExerciseActionTypes.DeleteExerciseFailed;

  constructor(public payload: any) {
  }
}

export class DeleteExerciseResetLoadingState implements Action {
  readonly type = ExerciseActionTypes.DeleteExerciseResetLoadingState;

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

  | GetSingleExercise
  | GetSingleExerciseSuccess
  | GetSingleExerciseFailed
  | GetSingleExerciseResetLoadingState

  | ResetSingleExercise

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

  | DeleteExercise
  | DeleteExerciseSuccess
  | DeleteExerciseFailed
  | DeleteExerciseResetLoadingState

  | SetFilterMuscleActionGroups;
