// Section 11 Lecture 60 - Post Reducer, Action & Initial
import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR } from "./types";

// Get posts
export const getPosts = () => async dispatch => {
  try {
    // the endpoint comes from your backend. The HTTP request that gets the posts
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
