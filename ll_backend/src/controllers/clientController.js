import Client from '../models/Client.js';

// setting up controllers for client routes
const getAllClients = (req, res) => {
  // console.log("Hit the sever endpoint for getting all clients");
  Client.find()
    .then(clients => {
      res.status(200).json({ message: "[STATUS] Get all clients", data: clients });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching clients", error: error.message });
    });
};

const getClientById = (req, res) => {
  const clientId = req.params.id;
  Client.findById(clientId)
    .then(client => {
      if (!client) {
        return res.status(404).json({ message: "[ERROR] Client not found" });
      }
      res.status(200).json({ message: `[STATUS] Get client by ID ${clientId}`, data: client });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching client", error: error.message });
    });
};

const createClient = (req, res) => {
  const clientData = req.body;
  Client.create(clientData)
    .then(client => {
      res.status(201).json({ message: "[STATUS] Client created", data: client });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error creating client", error: error.message });
    });
};

const updateClient = (req, res) => {
  const clientId = req.params.id;
  const updatedData = req.body;
  Client.findByIdAndUpdate(clientId, updatedData, { returnDocument: "after", runValidators: true })
    .then(client => {
      if (!client) {
        return res.status(404).json({ message: "[ERROR] Client not found" });
      }
      res.status(200).json({ message: `[STATUS] Client updated with ID ${clientId}`, data: client });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error updating client", error: error.message });
    });
};

const deleteClient = (req, res) => {
  const clientId = req.params.id;
  Client.findByIdAndDelete(clientId)
    .then(() => {
      res.status(200).json({ message: `[STATUS] Client deleted with ID ${clientId}` });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error deleting client", error: error.message });
    });
};

export { getAllClients, getClientById, createClient, updateClient, deleteClient };