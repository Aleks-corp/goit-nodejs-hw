import User from '../models/user.js';
import bcrypt from 'bcryptjs';

import { ApiError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw ApiError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError(401, 'Email or password is wrong');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw ApiError(401, 'Email or password is wrong');
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateUserSubscription = async (req, res) => {
  const { user, body } = req;
  if (user.subscription === body.subscription) {
    res.json({ message: 'You already have this subscription' });
    return;
  }
  const { email, subscription } = await User.findByIdAndUpdate(
    user._id,
    { subscription: body.subscription },
    {
      new: true,
    }
  );
  res.json({ email, subscription });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
