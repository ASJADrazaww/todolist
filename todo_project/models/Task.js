const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  priority: String,
});

module.exports = mongoose.model("Task", TaskSchema);
