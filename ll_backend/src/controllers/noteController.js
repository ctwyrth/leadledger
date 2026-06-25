import Note from "../models/Note.js";

const getAllNotes = (req, res) => {
  Note.find({ user: req.user._id }).populate('client').populate('opportunity')
    .then(notes => {
      res.status(200).json({ message: "[STATUS] Get all notes", data: notes });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching notes", error: error.message });
    });
};

const getNote = (req, res) => {
  Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate('client').populate('opportunity')
    .then(note => {
      if (!note) {
        return res.status(404).json({ message: "[ERROR] Note not found" });
      }
      res.status(200).json({ message: `[STATUS] Get note by ID ${req.params.id}`, data: note });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching note", error: error.message });
    });
};

const createNote = (req, res) => {
  Note.create({
    ...req.body,
    user: req.user._id,
  })
    .then(note => {
      res.status(201).json({ message: "[STATUS] Note created", data: note });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error creating note", error: error.message });
    });
};

const updateNote = (req, res) => {
  const { user, ...updateData } = req.body;

  Note.findOneAndUpdate({
    _id: req.params.id,
    user: req.user._id,
  },
  updatedData,
  {
    returnDocument: "after",
    runValidators: true
  })
    .then(note => {
      if (!note) {
        return res.status(404).json({ message: "[ERROR] Note not found" });
      }
      res.status(200).json({ message: `[STATUS] Note updated with ID ${req.params.id}`, data: note });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error updating note", error: error.message });
    });
};

const deleteNote = (req, res) => {
  Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "[ERROR] Note not found" });
      }
      res.status(200).json({ message: `[STATUS] Note deleted with ID ${req.params.id}`, data: note });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error deleting note", error: error.message });
    });
};

export { getAllNotes, getNote, createNote, updateNote, deleteNote };