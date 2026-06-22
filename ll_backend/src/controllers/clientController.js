import Client from '../models/Client.js';
import Opportunity from '../models/Opportunity.js';
import Note from '../models/Note.js';

// setting up controllers for client routes
const getAllClients = (req, res) => {
  // console.log("Hit the sever endpoint for getting all clients");
  Client.find({ user: req.user._id })
    .then(clients => {
      res.status(200).json({ message: "[STATUS] Get all clients", data: clients });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching clients", error: error.message });
    });
};

const getClientById = (req, res) => {
  Client.findOne({
    _id: req.params.id,
    user: req.user._id,
  })
    .then(client => {
      if (!client) {
        return res.status(404).json({ message: "[ERROR] Client not found" });
      }
      res.status(200).json({ message: `[STATUS] Get client by ID ${_id}`, data: client });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching client", error: error.message });
    });
};

const getClientOpportunities = (req, res) => {
  Opportunity.find({
    _id: req.params._id,
    user: req.user._id,
  })
    .then(opportunities => {
      res.status(200).json({
        message: `[STATUS] Get opportunities for client ID ${_id}`,
        data: opportunities,
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "[ERROR] Error fetching client opportunities",
        error: error.message,
      });
    });
};

const getClientNotes = (req, res) => {
  Note.find({
    _id: req.params._id,
    user: req.user._id,
  })
    .then(notes => {
      res.status(200).json({
        message: `[STATUS] Get notes for client ID ${_id}`,
        data: notes,
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "[ERROR] Error fetching client notes",
        error: error.message,
      });
    });
};
  
const createClient = (req, res) => {
  Client.create({
    ...req.body,
    user: req.user._id,
  })
    .then(client => {
      res.status(201).json({ message: "[STATUS] Client created", data: client });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error creating client", error: error.message });
    });
};

const updateClient = (req, res) => {
  const { user: ignoredUser, ...updateData } = req.body

  Client.findOneAndUpdate({
    _id: req.params._id,
    user: req.user._id,
  },
  updateData,
  {
    returnDocument: "after",
    runValidators: true,
  })
    .then(client => {
      if (!client) {
        return res.status(404).json({ message: "[ERROR] Client not found" });
      }
      res.status(200).json({ message: `[STATUS] Client updated with ID ${_id}`, data: client });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error updating client", error: error.message });
    });
};

const deleteClient = (req, res) => {
  Client.findOneAndDelete({
    _id: req.params._id,
    user: req.user._id,
  })
    .then((client) => {
      if (!client) {
        return res.status(404).json({ message: "[ERROR] Client not found" });
      }
      res.status(200).json({ message: `[STATUS] Client deleted with ID ${_id}`, data: client });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error deleting client", error: error.message });
    });
};

export { getAllClients, getClientById, getClientOpportunities, getClientNotes, createClient, updateClient, deleteClient };