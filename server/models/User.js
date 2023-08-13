const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
    unique: true,
  },
  Status: {
    type: String,
    required: true,
    default: "Active",
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
  Created: {
    ByID: {
      type: String,
    },
    ByName: {
      type: String,
    },
    OnDate: {
      type: Date,
      default: Date.now,
    },
  },
  Updation: [
    {
      ByID: {
        type: String,
      },
      ByName: {
        type: String,
      },
      OnDate: {
        type: Date,
        default: Date.now,
      },
      Updates: {
        type: Object,
      },
    },
  ],
  Deletion: {
    ByID: {
      type: String,
    },
    ByName: {
      type: String,
    },
    OnDate: {
      type: Date,
      // default: Date.now,
    },
    DeleteReason: {
      type: String,
    },
  },
});

module.exports = mongoose.model("user", UserSchema);
