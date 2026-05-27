const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

  role: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

const interviewSessionSchema =
  new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    messages: [messageSchema],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports =
  mongoose.model(
    "InterviewSession",
    interviewSessionSchema
  );