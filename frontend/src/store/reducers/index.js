import { combineReducers } from "redux";
import authReducers from "./auth";

import alertReducers from "./alerts.js";

export default combineReducers({
  AUTH_STATE: authReducers,

  ALERTS: alertReducers,
});
