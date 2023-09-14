const mongoose = require("mongoose");

const FirebaseUserSchema = new mongoose.Schema({
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
    type:Array,
  },
  InvolvedInDiscussion:{
    type:Boolean,
    default:false
  },
  MadePayment:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("firebaseuser", FirebaseUserSchema);
