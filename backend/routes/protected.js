import express from 'express';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Access granted to protected route!',
    user: req.user,
  });
});

export default router;
