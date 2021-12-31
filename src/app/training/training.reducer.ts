import {createFeatureSelector, createSelector} from "@ngrx/store";

import {Exercise} from "./exercise.model";

import * as TrainingActions from "./training.actions";
import * as fromRoot from "../app.reducer";

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState:TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
}


export function trainingReducer(state = initialState, action: TrainingActions.TrainingActions) {
  switch (action.type) {
    case TrainingActions.SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };

    case TrainingActions.SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      };

    case TrainingActions.START_EXERCISE:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };

    case TrainingActions.STOP_EXERCISE:
      return {
        ...state,
        activeTraining: null
      };

    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
