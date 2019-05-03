// Section 5 video 25
const express = require("express"); // we need express to use routers

const router = express.Router();

const { check, validationResult } = require("express-validator/check");

const auth = require("../../middleware/auth");

// need Profile and User models too b/c you can't have a post with a user and a user needs a profile
// we need them to get the name, avatar and user itself as these are fields in the PostSchema
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      // we are logged in at this point so we have the json webtoken in the request
      const user = await User.findById(req.user.id).select("-password");

      // take info from request or user const to fill in a Post object called newPost
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id // this is an ID field, that's why you don't use the user variable above (b/c that is the whole User object)
      });

      // save the Post object
      const post = await newPost.save();

      // show the Post object in JSON format in Postman
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// we put req.body in console.log because req.body is the object with all the info. We want to print it in the console so we see what got the right thing

// Public access means they don't need a json web token to perform this code
// Otherwise you'll get an unauthorized access message

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
