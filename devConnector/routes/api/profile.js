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

    // Build social object

    // now set the social field to an empty object, if you don't do this, you'll get an "undefined" error, it needs some value, so let it be an empty object for now
    profileFields.social = {};

    // The social field is an object made up of objects (youtube, twitter, etc.)
    // This is slightly different than what we did with the skills field which is an array of objects(strings)
    // So we, can't the youtube object with profileFields.youtube, we have to use profileFields.social.youtube
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // findOne() & findOneAndUpdate are monggose methods() so we need to use "await"
      // findOne() is a function available to all objects.
      // Our object is called "Profile" b/c that is what we exported it as in Profile.js in the models folder
      // We pass in the Profile object's user field (which will just hold the user's ID, not the whole user) and assign it req.user.id, which just grabs the user ID (user.id) from the request (req)
      let profile = await Profile.findOne({ user: req.user.id });

      // if the profile is found
      if (profile) {
        // Update the profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, // User's ID
          { $set: profileFields }, // uses the values in profileFields to update the profile by setting all the fields in the Profile object ("profile") with the fields in profileFields
          { new: true } // to show that we are making changes to the profile???
        );

        // return the whole profile
        return res.json(profile);
      }

      // if you could not find a profile, create it
      profile = new Profile(profileFields);
      // we save the Profile object using lowercase "profile", not uppercase "Profile" because is the model (for an object) and we need to save it on the instance of the model (profile)
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// access Public

router.get("/", async (req, res) => {
  try {
    // we want the name and avatar too (they are part of a profile) which are part of the user model so we use populate("NAMEOFMODEL", ["fieldName1", "fieldName2", etc.])
    // the find() method finds all of the model you specify (Profile)
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// NOTICE: we put a : before user_id because user_id is a placeholder we made up, that will be passed a value (the user's ID)
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID (not profile ID)
// access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    // we want the name and avatar too (they are part of a profile) which are part of the user model so we use populate("NAMEOFMODEL", ["fieldName1", "fieldName2", etc.])
    // we access the user ID from the URL sent by the request so we use "req.params.user_id" (user_id is what is in the URL)
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    // if there is no profile for that userID, return a 400 error
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);

    // if the user ID is too long to be a user ID, we don't want to say "Server Error" we want it to say "Profile not found"
    // err.kind is assigned the ObjectId type so if the error has something to do with the ObjectId it will go into this if statement. It's the "kind" of error, an ObjectId error
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
