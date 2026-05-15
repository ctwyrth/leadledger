import Opportunity from "../models/Opportunity.js";

// setting up controllers for opportunity routes
const getAllOpportunities = (req, res) => {
  // console.log("Hit the sever endpoint for getting all opportunities");
  Opportunity.find().populate('client') // Populate the client field with client details
    .then(opportunities => {
      res.status(200).json({ message: "[STATUS] Get all opportunities", data: opportunities });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching opportunities", error: error.message });
    });
};

const getOpportunityById = (req, res) => {
  const opportunityId = req.params.id;
  Opportunity.findById(opportunityId).populate('client') // Populate the client field with client details
    .then(opportunity => {
      if (!opportunity) {
        return res.status(404).json({ message: "[ERROR] Opportunity not found" });
      }
      res.status(200).json({ message: `[STATUS] Get opportunity by ID ${opportunityId}`, data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching opportunity", error: error.message });
    });
};

const createOpportunity = (req, res) => {
  const opportunityData = req.body;
  Opportunity.create(opportunityData)
    .then(opportunity => {
      res.status(201).json({ message: "[STATUS] Opportunity created", data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error creating opportunity", error: error.message });
    });
};

const updateOpportunity = (req, res) => {
  const opportunityId = req.params.id;
  const updatedData = req.body;
  Opportunity.findByIdAndUpdate(opportunityId, updatedData, { returnDocument: "after", runValidators: true })
    .then(opportunity => {
      if (!opportunity) {
        return res.status(404).json({ message: "[ERROR] Opportunity not found" });
      }
      res.status(200).json({ message: `[STATUS] Opportunity updated with ID ${opportunityId}`, data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error updating opportunity", error: error.message });
    });
};

const deleteOpportunity = (req, res) => {
  const opportunityId = req.params.id;
  Opportunity.findByIdAndDelete(opportunityId)
    .then((opportunity) => {
      if (!opportunity) {
        return res.status(404).json({ message: "[ERROR] Opportunity not found" });
      }
      res.status(200).json({ message: `[STATUS] Opportunity deleted with ID ${opportunityId}`, data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error deleting opportunity", error: error.message });
    });
};

export { getAllOpportunities, getOpportunityById, createOpportunity, updateOpportunity, deleteOpportunity };