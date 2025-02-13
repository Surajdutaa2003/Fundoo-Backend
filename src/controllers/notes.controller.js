import httpStatus from "http-status";
import * as noteService from "../services/notes.service.js";

// ✅ Create a Note
export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Validation: Title and Description required
    if (!title || !description) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Title and Description are required" });
    }

    const note = await noteService.createNote(req.user.id, title, description);
    res.status(httpStatus.CREATED).json(note);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// ✅ Get All Notes for Logged-in User
export const getAllNotes = async (req, res) => {
  try {
    const notes = await noteService.getAllNotes(req.user.id);
    res.json(notes);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// ✅ Get a Single Note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.user.id, req.params.id);
    if (!note) return res.status(httpStatus.NOT_FOUND).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// ✅ Update a Note
export const updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation: Title and Description required
    if (!title || !description) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Title and Description are required" });
    }

    const updatedNote = await noteService.updateNote(req.user.id, req.params.id, title, description);
    if (!updatedNote) return res.status(httpStatus.NOT_FOUND).json({ message: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// ✅ Delete a Note
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await noteService.deleteNote(req.user.id, req.params.id);
    if (!deletedNote) return res.status(httpStatus.NOT_FOUND).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
