const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({ name, email, password });
  const token = signToken(newUser._id);
  res.status(201).json({ status: 'success', token, data: { user: newUser } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
  }
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
};
