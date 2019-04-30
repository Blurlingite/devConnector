const express = require("express"); // we need express to use routers

const router = express.Router();

// bring in check and validationResult from express-validator package we downloaded to enable validation
const { check, validationResult } = require("express-validator/check");

// we can do router.post() etc. depending on what kind of HTTP you need to use

// we don't need to include /api/users because we already did in server.js

// it's good practice to write these 3 @s for the routers:
// 1st the method(POST) and URL
// 2nd a description of what it's doing
// 3rd the level of access (in this case it is private because we don't want someone to be able to create a profile if they are not logged in as a user yet, which they won't be because this is the users router. They have to get past this to become a user). We can use JSON tokens for this. We can make it so that they get a JSON token when they sign up to be a user, and send the JSON token (on the request) when they try to make a profile. If they have the JSON token, (they are logged in) let them make the profile, otherwise if they don't (haven't made an account yet) do not let them have access to the making a profile feature

// @route   POST api/users
// @desc    Register User
// @access  Public

// you can add words to the "/"" here if you want to change the endpoint
// for example if you put "/register" instead, the endpoint will be /register
router.post(
  "/",
  [
    // run check() function to display a message when user does not enter anything for "name"
    check("name", "Name is required")
      .not()
      .isEmpty(),

    check("email", "Please include a valid email")
      .isEmail() // checks to see if what the user entered is in email format
      .not()
      .isEmpty(),

    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }) // checks to see if the password the user entered is at least 6 characters long
  ],
  (req, res) => {
    const errors = validationResult(req); // we can only use validationResult if we imported it, which we did when we said this above const { check, validationResult } = require("express-validator/check");

    // if there are errors (if any of the data user enters, doesn't match), we will return an error status of 400, or bad request, (which will be shown on the webpage)
    // we will also use .json() to view all the error messages in the form of
    // an array using .array()
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User route");
  }
);
// we put req.body in console.log because req.body is the object with all the info. We want to print it in the console so we see what got the right thing

// Public access means they don't need a json web token to perform this code
// Otherwise you'll get an unauthorized access message

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
