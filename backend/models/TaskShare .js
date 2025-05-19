const mongoose = require("mongoose");

const taskShareSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shared_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shared_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("TaskShare", taskShareSchema);
