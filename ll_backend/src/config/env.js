import dotenv from 'dotenv';
import { mongo } from 'mongoose';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUri: process.env.DB_URI,
};

export default config;
