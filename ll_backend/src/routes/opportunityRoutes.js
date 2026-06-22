import express from 'express';

import { getAllOpportunities, getOpportunityById, createOpportunity, updateOpportunity, deleteOpportunity } from '../controllers/opportunityController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect)

router.get("/", getAllOpportunities);

router.get("/:id", getOpportunityById);

router.post("/", createOpportunity);

router.put("/:id", updateOpportunity);

router.delete("/:id", deleteOpportunity);

export default router;