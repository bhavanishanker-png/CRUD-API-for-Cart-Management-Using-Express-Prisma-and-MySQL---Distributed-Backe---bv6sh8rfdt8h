// routes/cartRoutes.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const prisma = new PrismaClient();

// Apply the auth middleware to all cart routes
router.use(authMiddleware);

// 1. Create a New Cart Entry
router.post("/addProduct", async (req, res) => {
  const { userId, productId, count } = req.body;

  if (!userId || !productId || !count) {
    return res.status(404).json({ error: "All fields required" });
  }

  try {
    const newCart = await prisma.cart.create({
      data: { userId, productId, count },
    });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error creating cart" });
  }
});

// 2. Retrieve Cart Entry by ID
router.get("/getById/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { cartId: parseInt(id) },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving cart" });
  }
});

// 3. Partially Update a Cart Entry
router.patch("/patch/:id", async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const updatedCart = await prisma.cart.update({
      where: { cartId: parseInt(id) },
      data: { count },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(404).json({ error: "Cart not found" });
  }
});

// 4. Delete a Cart Entry
router.delete("/removeProduct/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cart.delete({
      where: { cartId: parseInt(id) },
    });

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Cart not found" });
  }
});

module.exports = router;
