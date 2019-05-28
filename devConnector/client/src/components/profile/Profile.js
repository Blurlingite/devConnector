// Section 10 Lecture 56 - Starting On The Profile
// The parent component for the View Profile page
// bring in the state, bring in the actual profile data
// we need to get the ID from the route (the URL)

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";

// we pull out "match" from the URL. The URL has the ID and we can access it with "match"
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  // immediately when the profile mounts, getProfileById() will get the profile
  useEffect(() => {
    getProfileById(match.params.id); // NOT _id maybe b/c it comes from the URL and not the online database?
  }, [getProfileById]);
  return (
    <Fragment>
      {/* check if profile is loaded. While loading show the spinner gif. Otherwise, show the profile */}
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profile
          </Link>
          {/* If the profile you are viewing is yours, show the Edit Button */}
          {auth.isAuthenticated && // If you are authenticated and
          auth.loading === false && // you are done loading and
            // If the userId from auth (auth.user._id) is the same as the userId of the profile you are viewing (profile.user._id)
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link> // Show the Edit Button
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
