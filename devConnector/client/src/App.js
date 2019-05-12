import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar"; // bring in Navbar component
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// we must put the Alert tag above the container but above the Switch tag b/c the Switch tag can only have routes in it
import Alert from "./components/layout/Alert";

// Redux
// need a provider so we can connect Redux to React, we will enclose our entire app (our React app) in a Provider tag
import { Provider } from "react-redux";
// bring in the redux store found in our store.js that we made
import store from "./store";
import "./App.css";

const App = () => (
  // enclose everything in a Provider tag so all our components can access the app level state in the redux store
  // we need to pass in the redux store to the Provider
  <Provider store={store}>
    {/* in order for router to work, wrap everything in Router tag
   Router was brought in by this:   import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; */}
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

          {/* See Section 7 video 39 starting at 12:20 for a full explanation of how this Alert component is working in the backend */}
          <Alert />
          <Switch>
            {/* This component will only show up when the URL ends with "/register" */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
