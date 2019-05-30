// Section 11 Lecture 60 - Post Reducer, Action & Initial
import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

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

// Add like
// we need to know which post we are adding a like to so we need to pass in "postId" (a param whose name we just made up here)
export const addLike = id => async dispatch => {
  try {
    // the endpoint comes from your backend.
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      // "id" is the post's ID
      // the data that comes back are the "likes" so we assign it res.data
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
// we need to know which post we are adding a like to so we need to pass in "postId" (a param whose name we just made up here)
export const removeLike = id => async dispatch => {
  try {
    // the endpoint comes from your backend
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      // "id" is the post's ID
      // the data that comes back are the "likes" so we assign it res.data
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
