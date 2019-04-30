const express = require("express");

// the config package(dependency we downloaded) stores the variables that are accessible by all your program's files
// "db" is another one of your js files and is in the config folder
// so the file path is ./config/db
// the ./ returns you to the devconnector folder (the root, the beginning)
const connectDB = require("./config/db");

const app = express();

// connect database
// looks like it takes the const connectDB variable and uses it to connect to the database. That variable does lead you to the db.js file where you setup how you connect to the database, and then export at the end with modeule.exports
connectDB();

// Init Middleware (included with Express)
// So we can just use express.json()
// This allos us to get the data in req.body in users.js in the router.post()
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Use routes
// what this will do is make the endpoint you passed in (the first string) pertain to the '/' in the router.get() in users.js as dictated by the second parameter you passed in here. You don't need to put the ".js" extension on users here
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// when we deploy to heroku, this is where it gets the port number
// locally, if there is no default environment set, it defaults to localhost:5000
const PORT = process.env.PORT || 5000;

// when you connect to the server, this will print out this message
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
