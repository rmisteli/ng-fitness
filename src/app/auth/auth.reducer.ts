import * as AuthAction from "./auth.actions";

export interface State {
  isAuthenticated: boolean;
}

const initialState = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: AuthAction.AuthActions) {
  switch (action.type) {
    case AuthAction.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };

    case AuthAction.SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };

    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
