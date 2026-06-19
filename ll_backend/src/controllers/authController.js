import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js';

//create a JSON web token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: '[ERROR] Name, email, and password are required.'
    });
  }
  
  // Check if user already exists
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: "[ERROR] User already exists" });
      }
      
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
          return User.create({
            name,
            email,
            password: hashedPassword,
          });
        });
    })
    .then(user => {
      if (!user) return;
      
      res.status(201).json({
        message: '[STATUS] User registered',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        },
      });
    })
    .catch(error => {
      res.status(500).json({ 
        message: "[ERROR] Error registering user",
        error: error.message });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '[ERROR] Email and password are required' });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "[ERROR] That email is not associated with a user in this system" });
      }

      // Check password against the hashed bcrypt password
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(401).json({ message: "[ERROR] Invalid credentials" });
          }
        
          res.status(200).json({
            message: "[STATUS] User logged in successfully",
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id),
            },
          });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error logging user in", error: error.message });
    });
};

const getMe = (req, res) => {
  // Assuming userId is set in auth middleware
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "[ERROR] User not found" });
      }
      res.status(200).json({ message: "[STATUS] Get current user", data: req.user });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching user", error: error.message });
    });
};

export { registerUser, loginUser, getMe };