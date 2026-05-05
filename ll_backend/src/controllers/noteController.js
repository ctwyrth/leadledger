import Note from "../models/Note.js";

const getAllNotes = (req, res) => {
  Note.find().populate('client').populate('opportunity')
    .then(notes => {
      res.status(200).json({ message: "[STATUS] Get all notes", data: notes });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching notes", error: error.message });
    });
};

const getNoteById = (req, res) => {
  const noteId = req.params.id;
  Note.findById(noteId).populate('client').populate('opportunity')
    .then(note => {
      if (!note) {
        return res.status(404).json({ message: "[ERROR] Note not found" });
      }
      res.status(200).json({ message: `[STATUS] Get note by ID ${noteId}`, data: note });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching note", error: error.message });
    });
};

const createNote = (req, res) => {
  const noteData = req.body;
  Note.create(noteData)
    .then(note => {
      res.status(201).json({ message: "[STATUS] Note created", data: note });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error creating note", error: error.message });
    });
};

const updateNote = (req, res) => {
  const noteId = req.params.id;
  const updatedData = req.body;
  Note.findByIdAndUpdate(noteId, updatedData, { returnDocument: "after", runValidators: true })
    .then(note => {
      if (!note) {
        return res.status(404).json({ message: "[ERROR] Note not found" });
      }
      res.status(200).json({ message: `[STATUS] Note updated with ID ${noteId}`, data: note });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error updating note", error: error.message });
    });
};

const deleteNote = (req, res) => {
  const noteId = req.params.id;
  Note.findByIdAndDelete(noteId)
    .then(() => {
      if (!note) {
        return res.status(404).json({ message: "[ERROR] Note not found" });
      }
      res.status(200).json({ message: `[STATUS] Note deleted with ID ${noteId}` });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error deleting note", error: error.message });
    });
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };