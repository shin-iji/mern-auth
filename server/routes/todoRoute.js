const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Not all fields have been entered." });
    }

    const newTodo = Todo({
      title,
      userId: auth.user,
    });

    const savedTodo = await newTodo.save();

    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user });
  res.json(todos);
});

router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findOne({ userId: req.user, _id: req.params.id });
  if (!todo) {
    return res.status(400).json({ message: "No todo found with this ID that belongs to the current user." });
  }
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

module.exports = router;
