const mongoose = require('mongoose');

const CoursesListSchema = new mongoose.Schema({
  Status: {
    type: String,
    required: true,
    default: 'Active',
  },
  CourseID: {
    type: String,
    required: true,
    unique: true,
  },
  CourseName: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
  },
  EndDate: {
    type: Date,
  },
  Time: {
    type: String,
  },
  Cost: {
    Actual: {type: Number},
    Discounted: {type: Number},
  },
  Trainer: {
    type: String,
  },
  Place: {
    type: String,
  },
  EventDeleteDate: {
    type: Date,
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
        type: Array,
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

module.exports = mongoose.model('courselist', CoursesListSchema);
