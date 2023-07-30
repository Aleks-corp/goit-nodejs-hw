import { Schema, model } from 'mongoose';

import { handleUpdateValidator, handlerSaveError } from './hooks.js';
import { emailRegexp, userSubscription } from '../constants/usersConstants.js';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      match: [emailRegexp, 'Please set a valid email address'],
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    subscription: {
      type: String,
      enum: userSubscription,
      default: 'starter',
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handlerSaveError);

userSchema.pre('findOneAndUpdate', handleUpdateValidator);
userSchema.post('findOneAndUpdate', handlerSaveError);

const User = model('user', userSchema);
export default User;
