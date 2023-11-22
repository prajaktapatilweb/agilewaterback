const mongoose = require("mongoose");

const CoachesListSchema = new mongoose.Schema({
  Status: {
    type: String,
    required: true,
    default: "Active",
  },
  CoachID: {
    type: String,
    required: true,
    unique: true,
  },
  CoachName: {
    type: String,
    required: true,
    unique: true,
  },
  Experience: {
    type: Number,
  },
  Country: {
    type: String,
  },
  Summary: {
    type: String,
  },
  Specialization: {
    type: Array,
  },
  Expertise: {
    type: Array,
  },
  Avatar: {
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

module.exports = mongoose.model("coachlist", CoachesListSchema);
