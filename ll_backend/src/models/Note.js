import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    index: true,
  },
  opportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    index: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    enum: ['general', 'call', 'email', 'meeting', 'follow-up'],
    default: 'general',
    trim: true,
  },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;
    