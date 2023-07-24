import Contact from '../models/contact.js';
import { ApiError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAllContact = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw ApiError(404);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw ApiError(404);
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw ApiError(404);
  }
  res.json(contact);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw ApiError(404);
  }
  res.json({ message: 'Contact deleted' });
};

export default {
  getAllContact: ctrlWrapper(getAllContact),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
