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

// @route   GET api/posts
// @desc    Get all post
// @access  Private (is private b/c can't see posts page unless ur logged in)

router.get("/", auth, async (req, res) => {
  try {
    // we use sort() and pass in date to sort by date. We want most recent first so we put -1
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get post by Post ID
// @access  Private (is private b/c can't see posts page unless ur logged in)

router.get("/:id", auth, async (req, res) => {
  try {
    // req.params.id is the post ID from the URL (:id)
    const post = await Post.findById(req.params.id);

    // See if there's a post with that ID and if not return a 404 error
    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);

    // this is for if the ObjectID of Post object has too many or too little characters
    if (err.kind == "ObjectId") {
      res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by Post ID
// @access  Private (is private b/c can't see posts page unless ur logged in)

router.delete("/:id", auth, async (req, res) => {
  try {
    // we use sort() and pass in date to sort by date. We want most recent first so we put -1
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    // since req.user.is is a string and post.user is a number, you must convert post.user to a string to compare them
    // If the ID of the user on this post is not the one that is logged in(determined by json webtoken sent on the request), return a 401 error
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// we have to export the router in order for server.js to pick it up
module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/users/test
