// Action Types

import { SIGN_IN, LOG_OUT, AUTH_ERROR, LOAD_USER, STOP_INITIAL_LOADER } from '../types';

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
			localStorage.setItem('ACCESS_TOKEN', action.payload.responses.accessToken);
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.responses.user,
			};
		case LOAD_USER:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
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
		case STOP_INITIAL_LOADER:
			return {
				...state,
				loading: false,
			};
		default: {
			return state;
		}
	}
};

export default authReducers;
