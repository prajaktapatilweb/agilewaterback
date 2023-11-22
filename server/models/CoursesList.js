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
  ActualCost: {
    type: Number,
  },
  DiscountedCost: {
    type: Number,
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
  PaymentTypes: [
    {
      ConcessionType: {
        type: String,
      },
      Amount: {
        type: Number,
      },
      CloseDate: {
        type: Date,
      },
      DiscountCoupon: [
        {
          Title: {
            type: String,
          },
          Percentage: {
            type: Number,
          },
        },
      ],
    },
  ],
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

module.exports = mongoose.model('courselist', CoursesListSchema);
