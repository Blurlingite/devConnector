import axios from "axios";
import { setAlert } from "./alert";

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

// Create or update a profile
// we need the formData variable we made in some other file b/c that has all the form data
// we need the "history" object b/c it has a method called "push" that we can use to redirect to a different route ( a client side route) after submitting the form. This is how you typically redirect in an action, you can't use <Redirect> like how we do in components
// "edit" is going to be used to determine if we are making a new profile or updating a new one. If we are updating, we'll set it to true, if not change it to false. It is false by default
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    // we use GET_PROFILE to get the profile we just made
    // the payload's "res.data" is the actual info in the profile
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    // set an alert
    // if there was an edit ("?"), say "Profile Updated", otherwise (":") say "Profile Created"
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    // if there was not an edit, but you are creating a new profile (if ur came to this action you would be) then redirect to the "/dashboard" endpoint, which is the dashboard page in the browser
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    // see auth.js in "actions" folder for comments
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
