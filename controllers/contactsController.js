import Contact from '../models/contact.js';
import { ApiError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAllContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 0, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    '-owner -createdAt -updatedAt',
    { skip, limit }
  );
  const totalHits = await Contact.count(
    favorite ? { owner, favorite } : { owner }
  );
  res.json({ totalHits, contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).populate(
    'owner',
    'email subscription'
  );
  if (!contact) {
    throw ApiError(404);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const contact = await Contact.create({
    ...req.body,
    owner: req.user._id,
  });
  const { _id, name, email, phone, favorite } = contact;
  res.status(201).json({ _id, name, email, phone, favorite });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw ApiError(404);
  }
  const { _id, name, email, phone, favorite } = contact;
  res.json({ _id, name, email, phone, favorite });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw ApiError(404);
  }
  const { _id, name, email, phone, favorite } = contact;
  res.json({ _id, name, email, phone, favorite });
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
