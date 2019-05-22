// Section 9 Lecture 51
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// "Moment" is used to format dates
import Moment from "react-moment";
// we will have the experiences passed in from the parent component (Dashboard.js)
const Experience = ({ experience }) => {
  // we have access to the experience array from what was passed in above ("experience")
  // we will loop through the array passed in and format each one in it's own <td>
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {/* Moment will format the date from "exp.from"
      
        Since the "to" date from "exp.to" can be null, we have to check for that. 
        If it's null set the "to" date to "Now" else, set it to whatever date was on it
      */}
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>

      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            {/* hide-sm will hide this th on mobile screens(or on small screens) */}
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>

        {/* we will loop through the array of experiences to get each one */}
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
