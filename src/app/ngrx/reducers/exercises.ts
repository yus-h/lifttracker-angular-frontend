import { ExerciseActionsUnion, ExerciseActionTypes } from '../actions/exercises';
import { StateSaveStatus } from '../../shared/enums/StateSaveStatus';


export interface SaveStatus {

}

export interface State {
  exerciseList: any;
  lastPage: boolean;
  pageNumber: number;

  allMuscleGroups: any;
  filterMuscleGroupsApplied: any; // array of integer relating to muscle groups


  savedExercise: any; // track new exercise saved. TODO tbc if needed/merge with selected exercise later
  savedExerciseStatus: StateSaveStatus;
  updateExerciseStatus: StateSaveStatus;
  deleteExerciseStatus: StateSaveStatus;
  getSingleExerciseStatus: StateSaveStatus;
}

const initialState: State = {
  exerciseList: [],
  lastPage: undefined,
  pageNumber: undefined,

  allMuscleGroups: [],
  filterMuscleGroupsApplied: [],


  savedExercise: undefined,
  savedExerciseStatus: StateSaveStatus.INITIAL_STATE,
  updateExerciseStatus: StateSaveStatus.INITIAL_STATE,
  deleteExerciseStatus: StateSaveStatus.INITIAL_STATE,
  getSingleExerciseStatus: StateSaveStatus.INITIAL_STATE,

};

export function reducer(state: State = initialState, action: ExerciseActionsUnion) {

  switch (action.type) {



    // case ExerciseActionTypes.GetExercises: {
    //   return {
    //     ...state,
    //     exerciseList: action.payload
    //   };
    // }


    case ExerciseActionTypes.GetExercisesSuccess: {

      console.log('ACTION PAYLOAD', action)
      return {
        ...state,
        exerciseList: action.payload.content,
        lastPage: action.payload.last,
        pageNumber: action.payload.number
      };

    }

    case ExerciseActionTypes.ResetPaging: {

      return {
        ...state,
        pageNumber: undefined
      };

    }

    case ExerciseActionTypes.GetAllMuscleGroupsSuccess: {

      return {
        ...state,
        allMuscleGroups: action.payload
      };

    }

    case ExerciseActionTypes.SetFilterMuscleActionGroups: {

      return {
        ...state,
        filterMuscleGroupsApplied: action.payload
      };

    }


    case ExerciseActionTypes.SaveNewExercise: {
      return {
        ...state,
        savedExerciseStatus: StateSaveStatus.SAVE_IN_PROGRESS
      };
    }

    case ExerciseActionTypes.SaveNewExerciseSuccess: {

      return {
        ...state,
        savedExercise: action.payload,
        // TODO: default to initial state in component again after handling?
        savedExerciseStatus: StateSaveStatus.SAVE_SUCCESSFUL
      };

    }

    case ExerciseActionTypes.SaveNewExerciseFailed: {

      return {
        ...state,
        savedExerciseStatus: StateSaveStatus.SAVE_FAILED
      };

    }

    case ExerciseActionTypes.SaveNewExerciseResetLoadingState: {

      return {
        ...state,
        savedExerciseStatus: StateSaveStatus.INITIAL_STATE
      };
    }


    case ExerciseActionTypes.UpdateExercise: {

      return {
        ...state,
        updateExerciseStatus: StateSaveStatus.SAVE_IN_PROGRESS
      };

    }

    case ExerciseActionTypes.UpdateExerciseSuccess: {

      return {
        ...state,
        savedExercise: action.payload,
        updateExerciseStatus: StateSaveStatus.SAVE_SUCCESSFUL
      };

    }

    case ExerciseActionTypes.UpdateExerciseFailed: {

      return {
        ...state,
        updateExerciseStatus: StateSaveStatus.SAVE_FAILED
      };

    }

    case ExerciseActionTypes.UpdateExerciseResetLoadingState: {

      return {
        ...state,
        updateExerciseStatus: StateSaveStatus.INITIAL_STATE
      };
    }


    case ExerciseActionTypes.DeleteExercise: {

      return {
        ...state,
        deleteExerciseStatus: StateSaveStatus.SAVE_IN_PROGRESS
      };

    }

    case ExerciseActionTypes.DeleteExerciseSuccess: {

      return {
        ...state,
        deleteExerciseStatus: StateSaveStatus.SAVE_SUCCESSFUL
      };

    }

    case ExerciseActionTypes.DeleteExerciseFailed: {

      return {
        ...state,
        deleteExerciseStatus: StateSaveStatus.SAVE_FAILED
      };

    }

    case ExerciseActionTypes.DeleteExerciseResetLoadingState: {

      return {
        ...state,
        deleteExerciseStatus: StateSaveStatus.INITIAL_STATE
      };
    }


    case ExerciseActionTypes.GetSingleExercise: {

      return {
        ...state,
        getSingleExerciseStatus: StateSaveStatus.SAVE_IN_PROGRESS
      };

    }

    case ExerciseActionTypes.GetSingleExerciseSuccess: {

      return {
        ...state,
        savedExercise: action.payload,
        getSingleExerciseStatus: StateSaveStatus.SAVE_SUCCESSFUL
      };

    }

    case ExerciseActionTypes.GetSingleExerciseFailed: {

      return {
        ...state,
        getSingleExerciseStatus: StateSaveStatus.SAVE_FAILED,
      };

    }


    case ExerciseActionTypes.ResetSingleExercise: {

      return {
        ...state,
        savedExercise: initialState.savedExercise,
      };

    }

    case ExerciseActionTypes.GetSingleExerciseResetLoadingState: {

      return {
        ...state,
        getSingleExerciseStatus: StateSaveStatus.INITIAL_STATE,
      };

    }


  }

  return state;
}
