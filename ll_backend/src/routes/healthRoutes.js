import express from 'express';

const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime(), memoryUsage: process.memoryUsage(), env: process.env.NODE_ENV, message: 'LeadLedger API is healthy' });
});

export default router;