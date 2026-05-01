import mongoose from 'mongoose';
import config from './env.js';

const { dbUri } = config;

// connecting to the mongoose server
if (!dbUri) {
  console.error('[ERROR] DB_URI is not defined in environment variables');
  process.exit(1); // Exit the process with an error code
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('[STATUS] Connected to MongoDB');
  } catch (error) {
    console.error('[ERROR] Problem connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
  }
};

export default connectDB;
