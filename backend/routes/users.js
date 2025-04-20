import express from 'express';
import userModel from '../models/userSchema.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both username and password.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user document
    const newUser = new userModel({
      email: email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User created successfully.', userId: savedUser._id });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'An error occurred during signup.' });
  }
});

export default router;