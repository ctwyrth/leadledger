import express from "express";

import { getAllClients, getClient, getClientOpportunities, getClientNotes, createClient, updateClient, deleteClient } from "../controllers/clientController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect)

router.get("/", getAllClients);

router.get("/:id", getClient);

router.get("/:id/opportunities", getClientOpportunities);

router.get("/:id/notes", getClientNotes);

router.post("/", createClient);

router.put("/:id", updateClient);

router.delete("/:id", deleteClient);

export default router;