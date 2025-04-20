import express from 'express';
import userModel from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config(); 

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token payload
    const payload = {
      id: user._id,
      email: user.email,
    };

    // Sign JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'njsc45367363fvujjsuwu7', {
      expiresIn: '1h',
    });

    // Successful login
    res.status(200).json({
      message: 'Login successful',
      token, // send token to frontend
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
