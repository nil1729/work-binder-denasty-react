import { ADD_ALERTS, CLEAR_ALERTS } from '../types';

const clearAlerts = () => async (dispatch) => {
	dispatch({ type: CLEAR_ALERTS });
};

const addAlert = (alertType, message) => async (dispatch) => {
	dispatch({
		type: ADD_ALERTS,
		payload: { variant: alertType, message },
	});
};

export { clearAlerts, addAlert };
