const express = require("express"); // we need express to use routers

const router = express.Router();

// get code from auth.js in middleware folder so we can perform authentication
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator/check");

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

// @route   POST api/profile
// @desc    Create/Update a user profile
// @access  Private (b/c the user needs to have the token when they are logged in. Everything here assumes the user has logged in already)

// the endpoint is '/' because there is nothing after api/profile in the URL
router.post(
  "/",

  [
    //  everything in this purple square bracket are the 2 middlewares (check & validationResult) we are using for validation (brought in by this variable: const { check, validationResult } = require("express-validator/check");
    auth,
    [
      // we check for status and skills because those are the only fields that are marked as "required" in the ProfileSchema
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // validationResult takes in the request (req) and return any errors, which are then assigned to the const errord variable
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // errors.array is the array of all the errors, which we assign to a field called "errors" and we use .json to print it out in a console (on Postman)
      return res.status(400).json({ errors: errors.array });
    }

    // this pulls all these fields from the req.body (the body of the request)
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build Profile object

    const profileFields = {}; // initialize to an empty Profile object that you will fill up with the following code

    // we can set the user field of the ProfileSchema (Profile object) to the ObjectId of the user that got sent in with the request with req.user.id
    // Request (req) -> User object (user) -> ID field on the User object (id)
    profileFields.user = req.user.id; // it will know this just by the token that was sent in with the request

    // if there was a company, set the company field of the Profile object(profileFields), profileFields.company equal to that company
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    // Since skills is an array we have to split each item by the comma ","
    // Then we can use the map() function to declare a variable (skill) and trim the whitespace from each skill with the trim() function
    // The map() performs an action (the removing whitespace) on each element in the skill array
    // after the map() function is done, the split() function returns the new array (of skills without whitespace) to profileFields.skills, which is the skills field of the ProfileSchema (Profile object) in Profile.js in the models folder
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    console.log(profileFields.skills);
    res.send("Hello");
  }
);

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
