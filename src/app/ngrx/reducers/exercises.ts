import { ExerciseActionsUnion, ExerciseActionTypes } from '../actions/exercises';

export interface State {
  exerciseList: any;
  lastPage: boolean;
  pageNumber: number;

  allMuscleGroups: any;
  filterMuscleGroupsApplied: any; // array of integer relating to muscle groups
}

const initialState: State = {
  exerciseList: [],
  lastPage: undefined,
  pageNumber: undefined,

  allMuscleGroups: [],
  filterMuscleGroupsApplied: []
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


  }

  return state;
}
