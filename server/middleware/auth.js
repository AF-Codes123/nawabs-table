const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login check
exports.protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Pehle login karein' });
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User nahi mila' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token galat ya expire ho gaya' });
  }
};

// Sirf admin ke liye
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  res.status(403).json({ message: 'Sirf admin ye kar sakta hai' });
};