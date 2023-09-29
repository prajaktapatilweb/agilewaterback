const mongoose = require("mongoose");

const FirebaseUserSchema = new mongoose.Schema({
  Status: {
    type: String,
    default: "Active",
  },
  UserID: {
    type: String,
    required: true,
    unique: true,
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
  },
  FirebaseProvider: {
    type: String,
  },
  LoginData: {
    type: Array,
  },
  MadePayment: {
    type: Boolean,
    default: false,
  },
  QuizResult: {
    type: Object,
  },
});

module.exports = mongoose.model("firebaseuser", FirebaseUserSchema);
