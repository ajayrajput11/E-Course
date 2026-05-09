
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role: 'user' });

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JSON_SECRET, { expiresIn: '2d' });

    res.status(201).json({ message: 'User registered successfully', token,  user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },role:"user" });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JSON_SECRET, { expiresIn: '2d' });

    res.status(200).json({ token, role: 'user' ,
       user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const purchaseCourse = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ message: 'Course ID is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const alreadyPurchased = (user.purchasedCourses || []).map(String).includes(String(courseId));
    if (alreadyPurchased) return res.status(400).json({ message: 'Course already purchased' });

    user.purchasedCourses = user.purchasedCourses || [];
    user.purchasedCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Course purchased successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser, purchaseCourse };
