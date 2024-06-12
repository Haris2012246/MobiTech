const { InspectionRequest } = require("../models");
const { Products } = require("../models");

// Add a new inspection request
const saveInspectionRequest = async (req, res) => {
    const userId = req.user.userId;
    const { productId, date, homeAddress, status } = req.body;
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
        return res.status(404).send({ message: "Product not found" });
    }
    await InspectionRequest.create({ userId, productId, date, homeAddress, status });
    res.status(201).send({ message: "Inspection request saved successfully" }); //request successful and resource has been created
  };
  
// Get all inspection requests
const getAllInspectionRequests = async (req, res) => {
    const inspectionRequests = await InspectionRequest.findAll();
    res.status(200).send(inspectionRequests); //the request was successful
  };

// Get inspection request by ID
const getInspectionRequestById = async (req, res) => {
    const inspectionId = req.params.id;
    const inspectionRequest = await InspectionRequest.findByPk(inspectionId);
    if (!inspectionRequest) {
      return res.status(404).send({ message: "not found" });
    }
    res.status(200).send(inspectionRequest); //the request was successful
  };

// Delete request by ID
const deleteinspectionRequestById = async (req, res) => {
  const userId = req.user.userId;
  const inspectionId = req.params.id;

  const inspectionRequest = await InspectionRequest.findOne({ where: { inspectionId } });
  if (!inspectionRequest) {
    return res.status(404).send({ message: "Inspection request not found" });
  }
  if (inspectionRequest.userId !== userId) {
    return res.status(401).send({ message: "User is not authorized" });
  }

  await inspectionRequest.destroy();
  res.status(200).send({ message: "Inspection request deleted successfully" });
};

// Update a request
const updateInspectionRequest = async (req, res) => {
  const userId = req.user.userId;
  const inspectionId = req.params.id;
  const { date, homeAddress, status } = req.body;

  const inspectionRequest = await InspectionRequest.findOne({ where: { inspectionId } });
  if (!inspectionRequest) {
    return res.status(404).send({ message: "Inspection request not found" });
  }
  if (inspectionRequest.userId !== userId) {
    return res.status(401).send({ message: "User is not authorized" });
  }

  await inspectionRequest.update({ date, homeAddress, status });
  res.status(200).send({ message: "Inspection request updated successfully" });
};

module.exports = {
    saveInspectionRequest,
    getAllInspectionRequests,
    getInspectionRequestById,
    deleteinspectionRequestById,
    updateInspectionRequest
};


