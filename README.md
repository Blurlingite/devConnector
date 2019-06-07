# MERN-apps

This app uses MongoDB, Express.js, React.js, Redux, and Node.js

Change default.json file in config folder

This file is located in config/default.json

Add uri of your mongodb connection for example

"mongoURI": "mongodb://localhost/dev-social",

Here are the dependencies you should have:

express
express-validator
bcryptjs
config
gravatar
jsonwebtoken
mongoose
request
concurrently

Install server dependencies:

npm install

Install client dependencies:

cd client
npm install

Run both Express & React from root(this should open the app in your browser):

cd devConnector

npm run dev
