import express from "express";
import { getAllClients, getClientById, getClientOpportunities, getClientNotes, createClient, updateClient, deleteClient } from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getAllClients);

router.get("/:id", getClientById);

router.get("/:id/opportunities", getClientOpportunities);

router.get("/:id/notes", getClientNotes);

router.post("/", createClient);

router.put("/:id", updateClient);

router.delete("/:id", deleteClient);

export default router;