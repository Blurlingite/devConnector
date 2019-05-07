import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar"; // bring in Navbar component
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

const App = () => (
  // in order for router to work, wrap everything in Router tag
  // Router was brought in by this:   import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
  <Router>
    {/* Fragment is a ghost element, it won't show up in the DOM*/}
    <Fragment>
      <Navbar />
      {/* Render Landing component
        The "exact path" is where the component will show up (in this case it will be the home page b/c of the "/")
        The "component" is which component you want there
      */}
      <Route exact path="/" component={Landing} />
      {/* Everything has a container class expect Landing component so put them all in this section with that className */}
      <section className="container">
        {/* wrap everything in a Switch so we don't have issues with private routes */}
        <Switch>
          {/* This component will only show up when the URL ends with "/register" */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
