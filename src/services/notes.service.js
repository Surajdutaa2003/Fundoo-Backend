import Note from "../models/note.model.js";

// ✅ Create a new Note
export const createNote = async (userId, title, description) => {
  return await Note.create({ user: userId, title, description });
};

// ✅ Get all notes for a specific user
export const getAllNotes = async (userId) => {
  return await Note.find({ user: userId });
};

// ✅ Get a single note by ID
export const getNoteById = async (userId, noteId) => {
  return await Note.findOne({ _id: noteId, user: userId });
};

// ✅ Update a note by ID
export const updateNote = async (userId, noteId, title, description) => {
  return await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    { title, description },
    { new: true }
  );
};

// ✅ Delete a note by ID
export const deleteNote = async (userId, noteId) => {
  return await Note.findOneAndDelete({ _id: noteId, user: userId });
};
