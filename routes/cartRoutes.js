const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  addProductToCart,
  getCartById,
  updateCart,
  patchCart,
  removeProductFromCart
} = require('../controllers/cartController');

// Apply the auth middleware to all cart routes
router.use(authMiddleware);

// Define routes
router.post("/addProduct", addProductToCart); 
router.get("/getById/:id", getCartById); 
router.put("/put/:id", updateCart); 
router.patch("/patch/:id", patchCart); 
router.delete("/removeProduct/:id", removeProductFromCart);

module.exports = router;
