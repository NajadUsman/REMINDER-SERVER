// to give mongo db connection details

// mongoose impport

const mongoose = require("mongoose");

// state connection string

mongoose.connect("mongodb://localhost:27017/ReminderServer", {
  useNewUrlParser: true,
});

// model creation

const User = mongoose.model("User", {
  uid: Number,
  uname: String,
  password: String,
  record: [],
});

// export model-User

module.exports = {
  User,
};