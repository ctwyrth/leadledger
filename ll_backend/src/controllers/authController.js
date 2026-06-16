import User from '../models/User.js';

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: "[ERROR] User already exists" });
      }

      // Create new user
      const newUser = new User({ name, email, password });
      newUser.save()
        .then(user => {
          res.status(201).json({ message: "[STATUS] User registered successfully", data: user });
        })
        .catch(error => {
          res.status(500).json({ message: "[ERROR] Error registering user", error: error.message });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error checking existing user", error: error.message });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "[ERROR] User not found" });
      }

      // Check password (in a real app, use bcrypt to compare hashed passwords)
      if (user.password !== password) {
        return res.status(401).json({ message: "[ERROR] Invalid credentials" });
      }

      res.status(200).json({ message: "[STATUS] User logged in successfully", data: user });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error logging in user", error: error.message });
    });
};

const getMe = (req, res) => {
  const userId = req.userId; // Assuming userId is set in auth middleware
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "[ERROR] User not found" });
      }
      res.status(200).json({ message: "[STATUS] Get current user", data: user });
    })
    .catch(error => {
      res.status(500).json({ message: "[ERROR] Error fetching user", error: error.message });
    });
};

export { registerUser, loginUser, getMe };