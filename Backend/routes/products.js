const router = require("express").Router();

// controller
const {
  getAllProducts,
  getProductsByName,
  getProductById,
  getUserProducts,
  addNewProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/products");

// middlewares
const { validateToken } = require("../middlewares/validate-token");
const { validateRequest } = require("../middlewares/validate-request");
const upload = require('../middlewares/upload'); 

// validation
const {
  addProductSchema,
  updateProductSchema,
} = require("../utils/validation/products-schema");

// routes
router.get("/all", getAllProducts);
router.get("/model/:modelName", getProductsByName);
router.get("/:id", getProductById);
router.get('/user/:userId', getUserProducts);
router.post('/', validateToken, upload.single('image'), validateRequest(addProductSchema), addNewProduct);
router.patch("/:id", validateToken, validateRequest(updateProductSchema), updateProduct);

router.delete("/:id", validateToken, deleteProductById);

module.exports = router;
