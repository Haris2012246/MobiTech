const { SellitForMe } = require("../models");

// Add a new request
const saveSellRequest = async (req, res) => {
    const { userName, emailAddress, phoneNumber, address, modelName, mobileDescription, inspectionSlot, inspectionTime } = req.body;
    await SellitForMe.create({ userName, emailAddress,phoneNumber, address, modelName, mobileDescription, inspectionSlot, inspectionTime });
    res.status(201).send({ message: "Sell request saved successfully" }); 
  };
  
// Get all requests
const getAllSellRequests = async (req, res) => {
    const sellitForMe = await SellitForMe.findAll();
    res.status(200).send(sellitForMe); 
  };

// Get request by ID
const getSellRequestById = async (req, res) => {
    const SellitForMeID = req.params.id;
    const sellitForMe = await SellitForMe.findByPk(SellitForMeID);
    if (!sellitForMe) {
      return res.status(404).send({ message: "not found" });
    }
    res.status(200).send(sellitForMe); //the request was successful
  };

// Delete request by ID
const deleteSellRequestById = async (req, res) => {
  const SellitForMeID = req.params.id;

  const sellitForMe = await SellitForMe.findOne({ where: { SellitForMeID } });
  if (!sellitForMe) {
    return res.status(404).send({ message: "Inspection request not found" });
  }
  await sellitForMe.destroy();
  res.status(200).send({ message: "request deleted successfully" });
};

module.exports = {
    saveSellRequest,
    getAllSellRequests,
    getSellRequestById,
    deleteSellRequestById  
};
