import {
	SIGN_IN,
	LOAD_USER,
	LOG_OUT,
	STOP_INITIAL_LOADER,
	ADD_ALERTS,
	AUTH_ERROR,
	CLEAR_ALERTS,
} from '../types';

import sendRequest, { setAuthToken } from '../utils/axios-setup';

// Load user on Start
const loadUser = () => async (dispatch) => {
	try {
		let accessToken = localStorage.getItem('ACCESS_TOKEN');
		if (accessToken) setAuthToken(accessToken);
		else return dispatch({ type: STOP_INITIAL_LOADER });

		const res = await sendRequest.get('/auth/user');
		if (res.data.success) {
			dispatch({ type: LOAD_USER, payload: res.data.data });
		}
	} catch (e) {
		setAuthToken();
		dispatch({ type: AUTH_ERROR });
		dispatch({ type: STOP_INITIAL_LOADER });
		if (e.response && e.response.status === 403) {
			dispatch({
				type: ADD_ALERTS,
				payload: e.response && e.response.data,
			});
		}
	}
};

// Sign in a user (Email and Password)
const signInUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			const res = await sendRequest.post('/auth/login', {
				email,
				password,
			});
			setAuthToken(res.data.responses.accessToken);
			dispatch({ type: SIGN_IN, payload: res.data });
			dispatch({
				type: ADD_ALERTS,
				payload: { variant: 'success', message: 'Successfully signed in' },
			});
			return true;
		} catch (e) {
			console.log(e);
			dispatch({
				type: ADD_ALERTS,
				payload: { variant: 'error', message: e.response && e.response.data.message },
			});
		}
	};

// Sign in a user (Email and Password)
const forgotPasswordRequest =
	({ email }) =>
	async (dispatch) => {
		try {
			const res = await sendRequest.post('/auth/forgot_password', {
				email,
			});
			dispatch({
				type: ADD_ALERTS,
				payload: { variant: 'success', message: res.data.message },
			});
			return true;
		} catch (e) {
			console.log(e);
			dispatch({
				type: ADD_ALERTS,
				payload: { variant: 'error', message: e.response && e.response.data.message },
			});
		}
	};

const resetPasswordRequest =
	({ password, reset_token }) =>
	async (dispatch) => {
		try {
			const res = await sendRequest.put(`/auth/reset_password/${reset_token}`, {
				password,
			});
			dispatch({
				type: ADD_ALERTS,
				payload: { variant: 'success', message: res.data.message },
			});
			return true;
		} catch (e) {
			console.log(e);
			dispatch({
				type: ADD_ALERTS,
				payload: { variant: 'error', message: e.response && e.response.data.message },
			});
		}
	};

const clearAlerts = () => async (dispatch) => {
	dispatch({ type: CLEAR_ALERTS });
};

// logout user
const logOut = () => async (dispatch) => {
	setAuthToken();
	dispatch({ type: LOG_OUT });
	dispatch({
		type: ADD_ALERTS,
		payload: { message: 'Signed out successfully', variant: 'info' },
	});
};

export { signInUser, logOut, clearAlerts, loadUser, forgotPasswordRequest, resetPasswordRequest };
