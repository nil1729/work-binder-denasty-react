import { SIGN_IN, LOG_OUT, ADD_ALERTS, CLEAR_ALERTS } from "../types";

import sendRequest, { setAuthToken } from "../utils/axios-setup";

// Sign in a user (Email and Password)
const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const res = await sendRequest.post("/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      setAuthToken(res.data.responses.accessToken);
      dispatch({ type: SIGN_IN, payload: res.data });
      dispatch({
        type: ADD_ALERTS,
        payload: { success: true, message: res.data.message },
        // payload: res.data.responses.user.new_account
        //   ? [
        //       {
        //         success: true,
        //         message: res.data.message,
        //       },
        //       {
        //         success: true,
        //         message: "Kindly create your developer profile",
        //       },
        //     ]
        //   : {
        //       success: true,
        //       message: res.data.message,
        //     },
      });

      return true;
    } catch (e) {
      dispatch({
        type: ADD_ALERTS,
        payload: e.response && e.response.data,
      });
    }
  };

// Register a user (Email and Password)
// const signUpUser =
//   ({ name, email, password }) =>
//   async (dispatch) => {
//     try {
//       const res = await sendRequest.post("/auth/register", {
//         name,
//         email,
//         password,
//       });
//       setAuthToken(res.data.responses.accessToken);
//       dispatch({ type: SIGN_UP, payload: res.data });
//       dispatch({
//         type: ADD_ALERTS,
//         payload: res.data.responses.user.new_account
//           ? [
//               {
//                 success: true,
//                 message: res.data.message,
//               },
//               {
//                 success: true,
//                 message: "Kindly create your Blog ",
//               },
//             ]
//           : {
//               success: true,
//               message: res.data.message,
//             },
//       });
//       return true;
//     } catch (e) {
//       dispatch({
//         type: ADD_ALERTS,
//         payload: e.response && e.response.data,
//       });
//     }
//   };
const clearAlers = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
};

// logout user
const logOut = () => async (dispatch) => {
  setAuthToken();

  // dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: LOG_OUT });
  dispatch({
    type: ADD_ALERTS,
    payload: { success: true, message: "Logout Success" },
  });
};

export { signInUser, logOut, clearAlers };
