import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    index: true,
  },
  value: {
    type: Number,
    min: 0,
  },
  stage: {
    type: String,
    enum: ['new', 'contacted', 'proposal', 'won', 'lost', 'paused'],
    default: 'new',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  expectedCloseDate: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;