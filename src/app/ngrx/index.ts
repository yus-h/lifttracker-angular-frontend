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


export const selectExercises = (state: State) => state.exercises;
