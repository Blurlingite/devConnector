import React, { Fragment, useEffect } from "react"; // useEffect is a hook we can use the loadUser action b/c we are using functions
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
// import the loadUser action we made
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

// this is also in actions/auth.js  See those comments
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// we added {} and a return before the parantheses to const App b/c we want to use the loadUser action but we can't without the {} b/c App only returns JSX (which is not what loadUser will use)
const App = () => {
  // when the state updates, "useEffect" will keep running in a constant loop unless we add a second parameter of empty square brackets. So after that "useEffect" will only run once (which we want) This is similar to a componentDidMount in React. If you put properties in those square brackets it will make it so that the App will only update when those properties update. The empty square brackets tell React that your effect doesn't depend on any values from props or state so it never needs to re-run
  useEffect(() => {
    // take the Redux store directly (store) and dispatch (.dispatch) and then pass in the action you want to use (loadUser())
    store.dispatch(loadUser());
  });
  return (
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
};

export default App;
