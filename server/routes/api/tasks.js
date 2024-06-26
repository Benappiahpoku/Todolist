// routes/api/tasks.js

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Task = require("../../models/Task");

// @route   GET api/tasks
// @desc    Get all tasks for the authenticated user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    console.log("GET /api/tasks");
    console.log("req.user.id:", req.user.id);
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/tasks
// @desc    Create a new task for the authenticated user
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const newTask = new Task({
      content: req.body.content,
      user: req.user.id,
    });

    const task = await newTask.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found or not authorized" });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
