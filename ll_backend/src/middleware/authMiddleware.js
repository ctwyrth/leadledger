import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// authorization header protection
const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      message: '[ERROR] Not authorized, no token',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: '[ERROR] Not authorized, token failed',
      });
    }

    User.findById(decoded.id)
      .select('-password')
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: '[ERROR] Not authorized, user not found',
          });
        }

        req.user = user;
        next();
      })
      .catch(error => {
        res.status(500).json({
          message: '[ERROR] Authorization failed',
          error: error.message,
        });
      });
  });
};

export default protect;