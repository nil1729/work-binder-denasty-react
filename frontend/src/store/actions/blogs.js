import {
  GET_BLOGS_LIST,
  GET_SINGLE_BLOG,
  CREATE_BLOG,
  ADD_ALERTS,
  CLEAR_ALERTS,
} from "../types";

import sendRequest, { setAuthToken } from "../utils/axios-setup";

// Load user on Start
const createNewBlog = (title, body, coverPhoto) => async (dispatch) => {
  try {
    let accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) setAuthToken(accessToken);
    else {
      dispatch({
        type: ADD_ALERTS,
        payload: {
          message: "Kindly login again. Session Expired!",
          variant: "warning",
        },
      });
      return window.location.reload();
    }
    console.log(title, body, coverPhoto);

    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("cover-photo", coverPhoto);
    await sendRequest.post(`blogs`, formData);
    dispatch({
      type: ADD_ALERTS,
      payload: { message: "New Blog Post published", variant: "success" },
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};

const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await sendRequest.get(`/blogs`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const getBlog = (id) => async (dispatch) => {
  try {
    const res = await sendRequest.get(`/blogs/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export { createNewBlog, getAllBlogs, getBlog };
