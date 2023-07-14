import express from 'express';
import {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} from '../../models/contacts.js';
import ApiError from '../../helpers/ApiError.js';
import Joi from 'joi';

const contactsSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `'name' should be a type of 'text'`,
    'string.empty': `'name' cannot be an empty field`,
    'any.required': `missing required 'name' field`,
  }),
  email: Joi.string().email().required().messages({
    'string.email': `'email' should be a type of 'email'`,
    'string.empty': `'email' cannot be an empty field`,
    'any.required': `missing required 'email' field`,
  }),
  phone: Joi.string().required().messages({
    'string.empty': `'phone' cannot be an empty field`,
    'any.required': `missing required 'phone' field`,
  }),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw ApiError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      throw ApiError(400, 'Missing fields');
    }
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw ApiError(400, error.message);
    }
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      throw ApiError(400, 'Missing fields');
    }
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw ApiError(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw ApiError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      throw ApiError(404);
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
