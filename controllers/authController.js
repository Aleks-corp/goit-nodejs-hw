import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';

import { ApiError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const url = gravatar.url(email, { protocol: 'http', s: '250' });
  const user = await User.findOne({ email });
  if (user) {
    throw ApiError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: url,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      avatarURL: newUser.avatarURL,
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
      avatarURL: user.avatarURL,
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
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
};

const updateUserSubscription = async (req, res) => {
  const { user, body } = req;
  if (user.subscription === body.subscription) {
    res.json({ message: 'You already have this subscription' });
    return;
  }
  const { email, subscription, avatarURL } = await User.findByIdAndUpdate(
    user._id,
    { subscription: body.subscription },
    {
      new: true,
    }
  );
  res.json({ email, subscription, avatarURL });
};

const updateAvatar = async (req, res) => {
  const { user, body, file } = req;
  console.log('file:', file);
  console.log('body:', body);
  console.log('user:', user);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
