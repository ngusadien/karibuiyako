import express from "express";
import productModel from "../models/productSchema.js";

const router = express.Router();

// Route to fetch all products
router.get("/products", async (req, res) => {
  try {
     // Fetch all products
    const products = await productModel.find();
    // Send response with products
    res.status(200).json(products); 
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

export default router;
