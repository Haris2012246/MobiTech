const router = require("express").Router();

// controller
const {
    saveSellRequest,
    getAllSellRequests,
    getSellRequestById,
    deleteSellRequestById 
  } = require("../controllers/sellitForMe");

// middlewares
const { validateRequest } = require("../middlewares/validate-request");
// const { isAdmin } = require("../middlewares/userRole-admin"); to be added afterwards



// validation
const {
    sellitForMeRequestSchema
  } = require("../utils/validation/sell-Form-schema");

// routes
router.get("/all", getAllSellRequests);
router.get("/:id", getSellRequestById);

router.post("/", validateRequest(sellitForMeRequestSchema), saveSellRequest); //ADD

router.delete("/:id" ,deleteSellRequestById); // FYP2[only admin can delete. isAdmin middleware to be added afterwards]

module.exports = router;