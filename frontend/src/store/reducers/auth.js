// Action Types

import { SIGN_IN, LOG_OUT, AUTH_ERROR } from "../types";

// Initial Auth State
const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

// Reducer
const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      console.log(action?.data);
      localStorage.setItem(
        "ACCESS_TOKEN",
        action.payload.responses.accessToken
      );
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.responses.user,
      };

    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default: {
      return state;
    }
  }
};

export default authReducers;
