import { ActionReducer, ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromExercises from './reducers/exercises';

export interface State {
  exercises: fromExercises.State;
}


export const reducers: ActionReducerMap<State> = {
  exercises: fromExercises.reducer
};


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = [logger, storeFreeze];


// Main state slices
export const selectExercises = (state: State) => state.exercises;


export const selectList = createSelector(
  selectExercises,
  (state: fromExercises.State) => state.exerciseList
);

export const selectAllMuscleGroups = createSelector(
  selectExercises,
  (state: fromExercises.State) => state.allMuscleGroups
);


export const savedExerciseStatus = createSelector(
  selectExercises,
  (state: fromExercises.State) => state.savedExerciseStatus
);

export const updateExerciseStatus = createSelector(
  selectExercises,
  (state: fromExercises.State) => state.updateExerciseStatus
);


export const selectCurrentExercise = createSelector(
  selectExercises,
  (state: fromExercises.State) => state.savedExercise
);


export const selectFilters = createSelector(
  selectExercises,
  (state: fromExercises.State) => state.filterMuscleGroupsApplied
);
