import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import productModel from "../models/productSchema.js";

const router = express.Router();

//path to save file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// POST route
router.post('/products', upload.array('images', 5), async (req, res) => {
  try {
    const { productName, price, details, category } = req.body;

    if (!productName || !price || !details || !category || !req.files?.length) {
      return res.status(400).json({ message: "Missing required fields or images." });
    }

    const imagePaths = req.files.map(file =>
      `uploads/${file.filename}` 
    );

    const newProduct = new productModel({
      productName,
      price,
      details,
      category,
      images: imagePaths,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
