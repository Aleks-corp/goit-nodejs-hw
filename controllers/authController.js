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

  user.token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '23h' });
  await user.save();
  res.json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
