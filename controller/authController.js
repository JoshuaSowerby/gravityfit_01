require('dotenv').config();  // ✅ This loads your .env variables

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Profile = require('../model/Profile');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generate JWT token for user
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      username: user.username
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @desc Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    // Create and save matching profile
    const profile = new Profile({
      userId: newUser._id,
      username: newUser.username,
      bio: "",
      age: null,
      imageUrl: ""
    });
    await profile.save();

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      userId: newUser._id,
      username: newUser.username
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
