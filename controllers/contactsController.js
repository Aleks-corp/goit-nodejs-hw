import {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} from '../models/contacts.js';
import { ApiError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw ApiError(404);
  }
  res.json(contact);
};

const add = async (req, res) => {
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    throw ApiError(404);
  }
  res.json(contact);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    throw ApiError(404);
  }
  res.json({ message: 'Contact deleted' });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  removeById: ctrlWrapper(removeById),
};
