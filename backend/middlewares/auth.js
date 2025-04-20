// backend/middlewares/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'njsc45367363fvujjsuwu7');
    req.user = decoded;
    next();
    
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid or expired' + token });
  }
};
