const express = require("express"); // we need express to use routers

const router = express.Router();

// getting code from middleware folder's auth.js file
// we can now use this auth middleware by passing in this variable
const auth = require("../../middleware/auth");

const User = require("../../models/User");
// @route   GET api/auth
// @desc    Test route
// @access  Public

// we passed in the "auth" as the 2nd parameter so we can use the middleware. Always pass it in as the 2nd parameter. Just doing that will make this rout e protected
// This will allow you to get the user data as long as you have the right token (sent in on the request's header)
router.get("/", auth, async (req, res) => {
  try {
    // the req.user comes from the auth.js file in the middleware folder
    // in that file we set req.user equal to decode.user (the User object), so we can access the id value of that User object with req.user.id
    // we can access req.user anywhere in a protected route (like this one)
    // the .select("-password") will exclude the password field in the User object from being returned (which we don't want)
    const user = await User.findById(req.user.id).select("-password");
    res.json(user); // send the User object (and all it's values) in JSON format (this is how it prints out the User data in Postman after hitting "SEND")
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// we put req.body in console.log because req.body is the object with all the info. We want to print it in the console so we see what got the right thing

// Public access means they don't need a json web token to perform this code
// Otherwise you'll get an unauthorized access message

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
