import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['individual', 'business'],
    default: 'individual',
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  contactName: {
    type: String,
    trim
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    enum: ['referral', 'website', 'social', 'cold-outreach', 'marketplace', 'other'],
    default: 'other',
  },
  status: {
    type: String,
    enum: ['lead', 'active', 'inactive', 'lost', 'archived'],
    default: 'lead',
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

export default Client;