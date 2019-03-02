import { ExerciseActionsUnion, ExerciseActionTypes } from '../actions/exercises';

export interface State {
  exercises: any;
}

const initialState: State = {
  exercises: [],
};

export function reducer(state: State = initialState, action: ExerciseActionsUnion) {

  switch (action.type) {

    case ExerciseActionTypes.GetExercises: {
      return {
        ...state,
        exercises: action.payload
      };
    }


  }

  return state;
}
