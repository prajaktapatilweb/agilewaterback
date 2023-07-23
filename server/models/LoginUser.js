const mongoose = require('mongoose');

const LoginUserSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
    unique: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Mobilenumber: {
    type: String,
    required: true,
  },
  Avatar: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('loginuser', LoginUserSchema);
