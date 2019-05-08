import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  // "formData" will be the state for form elements
  // need a state for form elements b/c those fields could change
  // anything that can change or is dynamic needs a state
  // "setFormData" is like this.setState (where you can change values, change the state)
  // useState() will hold the default values
  // only need email and password b/c they are just trying to login
  const [formData, setFormData] = useState({
    email: "",
    password: ""
    // password2 is used when the user must re-enter their password to confirm
  });

  // pull out these things from formData so you don't need to keep doing formData.name, etc.
  const { email, password } = formData;

  // ...formData makes a copy of formData (it is the spread operator)
  // we pass in name b/c thats what we want to change
  // "e.target.value" gets the value of the input (which we labeled with "e" when we did this : onChange={e => onChange(e)} in the form)
  //"[e.target.name]" will get replaced with whatever is assigned to the name attribute in a form element. So if we have name="email" it will be replaced with "email" This is so we can use the onChange() function with any of our form elements
  // So that means "e" is the element. "target" lets us target the element and then we can access the name of the element (of any attribute assigned to the element) with .NAMEOFATTRIBUTE (.name in this case)
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // this will run when the form is submitted
  // need async b/c this is asynchronous
  const onSubmit = async e => {
    e.preventDefault();

    console.log("SUCCESS");
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      {/* This form will call the function onSubmit() above when submitted
      "e" is now the action of submission */}
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            // This will use the function in "const onChange". We call it with onChange() and pass in e
            onChange={e => onChange(e)}
            required // used to display a message when user does not enter one
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            // This will use the function in "const onChange". We call it with onChange() and pass in e
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
