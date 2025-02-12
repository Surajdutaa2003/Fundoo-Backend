import express from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import Note from "../models/notes.model.js";

const router = express.Router();

// ✅ Create a Note
router.post("/", userAuth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({
      userId: req.user.id,
      title,
      description,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Notes for Logged-in User
router.get("/", userAuth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a Single Note by ID
router.get("/:id", userAuth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a Note
router.put("/:id", userAuth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a Note
router.delete("/:id", userAuth, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
