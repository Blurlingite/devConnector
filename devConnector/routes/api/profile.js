const express = require("express"); // we need express to use routers

// const router = express.Router();

// we can do router.post() etc. depending on what kind of HTTP you need to use

// @route GET api/profile/test
// @desc  Tests profile route
// @access  Public
// router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
// res.json() will output json. Automatically serves a status of 200, which means everything is ok. We will use Postman to test it

// we have to export the router in order for server.js to pick it up
// module.exports = router;

// test out this URL in the browser to see if you get the JSON message http://localhost:5000/api/profile/test
