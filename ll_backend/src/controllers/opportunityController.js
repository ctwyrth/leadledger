import Opportunity from "../models/Opportunity.js";

// setting up controllers for opportunity routes
const getAllOpportunities = (req, res) => {
  // console.log("Hit the sever endpoint for getting all opportunities");
  Opportunity.find({ user: req.user._id }).populate('client') // Populate the client field with client details
    .then(opportunities => {
      res.status(200).json({ message: "[STATUS] Get all opportunities", data: opportunities });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching opportunities", error: error.message });
    });
};

const getOpportunity = (req, res) => {
  Opportunity.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate('client') // Populate the client field with client details
    .then(opportunity => {
      if (!opportunity) {
        return res.status(404).json({ message: "[ERROR] Opportunity not found" });
      }
      res.status(200).json({ message: `[STATUS] Get opportunity by ID ${req.params.id}`, data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching opportunity", error: error.message });
    });
};

const createOpportunity = (req, res) => {
  Opportunity.create({
    ...opportunityData,
    user: req.user._id,
  })
    .then(opportunity => {
      res.status(201).json({ message: "[STATUS] Opportunity created", data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error creating opportunity", error: error.message });
    });
};

const updateOpportunity = (req, res) => {
  const { user, ...updateData } = req.body;
  Opportunity.findOneAndUpdate({
    _id: req.params.id,
    user: req.user._id,
  },
  updateData,
  {
    returnDocument: "after",
    runValidators: true
  })
    .then(opportunity => {
      if (!opportunity) {
        return res.status(404).json({ message: "[ERROR] Opportunity not found" });
      }
      res.status(200).json({ message: `[STATUS] Opportunity updated with ID ${req.params.id}`, data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error updating opportunity", error: error.message });
    });
};

const deleteOpportunity = (req, res) => {
  Opportunity.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  })
    .then((opportunity) => {
      if (!opportunity) {
        return res.status(404).json({ message: "[ERROR] Opportunity not found" });
      }
      res.status(200).json({ message: `[STATUS] Opportunity deleted with ID ${req.params.id}`, data: opportunity });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error deleting opportunity", error: error.message });
    });
};

export { getAllOpportunities, getOpportunity, createOpportunity, updateOpportunity, deleteOpportunity };