import express from 'express';
import contactsServises from '../../models/contacts.js';
import ApiError from '../../helpers/ApiError.js';
import ValidateData from '../../validation/validationContacts.js';

const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServises.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsServises.getContactById(contactId);
    if (!contact) {
      throw ApiError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contactsServises.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsServises.updateContact(contactId, req.body);
    if (!contact) {
      throw ApiError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsServises.removeContact(contactId);
    if (!contact) {
      throw ApiError(404);
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.post('/', ValidateData, addContact);
router.put('/:contactId', ValidateData, updateContact);
router.delete('/:contactId', removeContact);

export default router;
