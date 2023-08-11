const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
    unique: true,
  },
  Status: {
    type: String,
    required: true,
    default: 'Active',
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
  Password: {
    type: String,
    required: true,
  },
  Mobilenumber: {
    type: String,
    // required: true,
  },
  Avatar: {
    type: String,
  },
  Role: {
    type: String,
  },
});

module.exports = mongoose.model('user', UserSchema);
