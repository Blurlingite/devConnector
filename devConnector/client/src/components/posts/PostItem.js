// Section 11 Lecture 61 - Post Item Component
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
// used when we add a like, remove a like, delete a post,etc
import { connect } from "react-redux";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (
  <div class="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img class="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class="my-1">{text}</p>
      <p class="post-date">
        {" "}
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button type="button" class="btn btn-light">
        <i class="fas fa-thumbs-up" />{" "}
        {/* check if there are likes and then show how many there are of there are some (in the span tag) */}
        <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button type="button" class="btn btn-light">
        <i class="fas fa-thumbs-down" />
      </button>
      {/* we want to be linked to the post so we use backticks and pass in the ID (_id) */}
      <Link to={`/post/${_id}`} class="btn btn-primary">
        Discussion{" "}
        {/* check if there are comments and then show how many there are of there are some (in the span tag) */}
        {comments.length > 0 && (
          <span class="comment-count">{comments.length}</span>
        )}
      </Link>

      {/* only show the delete post button if the post belongs to that user. We use auth for this
      
      "user" is the post's user ID (remember we made "user" just the user ID in another file)
      "auth.user._id" is the user that is logged in

      If they are equal, that means this post belongs to the user currently logged in
      */}
      {!auth.loading && user === auth.user._id && (
        <button type="button" class="btn btn-danger">
          <i class="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// uses auth's state so we can provide a button to delete a post/comment only if that post/comment belongs to that user
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {}
)(PostItem);
