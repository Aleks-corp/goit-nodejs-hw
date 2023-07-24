import { Schema, model } from 'mongoose';

import { handleUpdateValidator, handlerSaveError } from './hooks.js';
import { emailRegexp } from '../constants/contactsConstants.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: [emailRegexp, 'Please set a valid email address'],
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', handlerSaveError);

contactSchema.pre('findOneAndUpdate', handleUpdateValidator);
contactSchema.post('findOneAndUpdate', handlerSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
