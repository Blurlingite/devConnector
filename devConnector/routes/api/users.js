const express = require("express"); // we need express to use routers

const router = express.Router();

// we can do router.post() etc. depending on what kind of HTTP you need to use

// we don't need to include /api/users because we already did in server.js

// it's good practice to write these 3 @s for the routers:
// 1st the method(POST) and URL
// 2nd a description of what it's doing
// 3rd the level of access (in this case it is private because we don't want someone to be able to create a profile if they are not logged in as a user yet, which they won't be because this is the users router. They have to get past this to become a user). We can use JSON tokens for this. We can make it so that they get a JSON token when they sign up to be a user, and send the JSON token (on the request) when they try to make a profile. If they have the JSON token, (they are logged in) let them make the profile, otherwise if they don't (haven't made an account yet) do not let them have access to the making a profile feature

// @route POST api/users/test
// @desc  Register User
// @access  Public
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("User route");
});
// we put req.body in console.log because req.body is the object with all the info. We want to print it in the console so we see what got the right thing

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
