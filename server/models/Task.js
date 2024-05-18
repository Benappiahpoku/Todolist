// models/Task.js

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

module.exports = Task = mongoose.model("task", TaskSchema);
