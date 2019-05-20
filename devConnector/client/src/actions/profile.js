import axios from "axios";
// import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get current user's profile of whatever user that is logged in
export const getCurrentProfile = () => async dispatch => {
  try {
    // "/api/profile/me" comes from your backend in the route in "routes" folder in profile.js
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
