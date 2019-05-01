const express = require("express"); // we need express to use routers

const router = express.Router();

// get code from auth.js in middleware folder so we can perform authentication
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");

const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private (b/c the user needs to have the token when they are logged in. Everything here assumes the user has logged in already)

// we use "async" b/c we are usimg mongoose here, which returns a promise
// the /me is the endpoint as shown here:  @route   GET api/profile/me
router.get("/me", auth, async (req, res) => {
  try {
    // the "user:" is the user field in ProfileSchema in Profile.js in the models folder. And that has a type of ObjectId. We set the ObjectId to the user ID that comes in with the token on the request with req.user.id
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user", // the 1st parameter is the object you want to get data from. We use "user" (with a lowercase u) b/c in User.js's module.exports statement we added the UserSchema (object) to the model under that name (user)
      [
        // the 2nd parameter is an array of fields from that object you want
        "name",
        "avatar"
      ]
    );

    // if there's no profile for the user, return a 400 error
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
