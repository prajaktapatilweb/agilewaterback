const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  PageAsPath: {
    type: String,
    required: true,
  },
  Comments: [
    {
      Status: {
        type: String,
        required: true,
        default: "SentForModeration",
      },
      Content: {
        type: String,
      },
      IsItReply: {
        type: Boolean,
        default: false,
      },
      RepliedToSuperParentID: {
        type: String,
      },
      RepliedToParentID: {
        type: String,
      },
      ThreadLevel: {
        type: Number,
        default: 0,
      },
      ByEmailID: {
        type: String,
      },
      ByName: {
        type: String,
      },
      AvatarURL: {
        type: String,
      },
      OnDate: {
        type: Date,
        default: Date.now,
      },
      Approval:{
        By:{
          type:String
        },
        OnDate: {
          type: Date,
        },
      }
    },
  ],
});

module.exports = mongoose.model("comment", CommentSchema);
