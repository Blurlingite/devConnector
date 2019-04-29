const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema. This is like MySQL where you declare the datatypes of the fields and if they are required
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
