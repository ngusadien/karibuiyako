import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoute from './routes/products.js';
import fetchproductRoute from './routes/fetchproduct.js';
import productById from './routes/productById.js';
import userAuth from './routes/userAuth.js';
import users from './routes/users.js';
import protectedRoute from './routes/protected.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const DATABASE_URI = process.env.DATABASE_URI;

if (!DATABASE_URI) {
  console.error('DATABASE_URI is missing from environment variables.');
  process.exit(1);
}

// ES Module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', productRoute);
app.use('/a', fetchproductRoute);
app.use('/a/products', productById);
app.use('/api/auth', users);
app.use('/api/user', userAuth);
app.use('/api/verify-token', protectedRoute);





// MongoDB Connection
mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

export default app;
