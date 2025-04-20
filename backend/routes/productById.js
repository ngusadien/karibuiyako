import express from 'express';
import productModel from '../models/productSchema.js';

const router = express.Router();

// 👇 Add this route
router.get('/:id', async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
