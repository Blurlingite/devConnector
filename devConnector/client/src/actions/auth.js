//See Section 8 Video 40
// we bring in axios b/c this is where we make our request
import axios from "axios";
import { setAlert } from "./alert";

// import these types from types.js
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// This will register a User
// It takes in an object that has a name,email & password
// We use async await b/c we are making a request
// Everything on the left of "async dispatch" is stuff we take in.
// Everything on the right of "async dispatch" is us preparing what we took in and returning it
export const register = ({ name, email, password }) => async dispatch => {
  // We are building the request and this one needs a Content-Type header b/c we are sending data
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // put the stuff we took in into the request body but use JSON format
  const body = JSON.stringify({ name, email, password });

  try {
    // Send this back as the response
    // 1st param: the endpoint the response will submit to
    // 2nd param: the stuff in the request body
    // 3rd param: any configs we need (in this case the variable we made that holds the Content-Type)
    const res = await axios.post("/api/users", body, config);

    // the register is successful if your in the try block so dispatch the REGISTER_SUCCESS type
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    // otherwise the register has failed so dispatch the REGISTER_FAIL type
    // we don't do anything with payload in the types.js so we don't need it here

    // we want to get the array of errors from the "err" in the catch() so we can display them on the webpage. The errors passed into "err" comes from our backend that we made earlier in the course
    // we access the response's data b/c that is where the errors come from by using err.response.data.errors
    // the array is called "errors" (I think we gave it that name somewhere?)
    const errors = err.response.data.errors;

    // if there are errors, loop through them
    // for each error, dispatch the setAlert action (which takes in a message "error.msg" and an alertType "danger")
    // setAlert() is an action we made in alert.js in the "actions" folder. In alert.js we added a timeout variable in the parameter list but we initialized it in the parameter list so we don't need a 3rd parameter here.
    // After doing all that, we need to go to Register component in Register.js in our componenets folder and connect this (the auth action) to it
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
