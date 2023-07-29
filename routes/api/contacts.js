import express from 'express';
import {
  isEmptyBody,
  isEmptyBodyStatus,
  isValidId,
  authenticateToken,
} from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { contactSchemas } from '../../schemas/index.js';
import { contactsController } from '../../controllers/index.js';

const {
  getAllContact,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContact,
} = contactsController;
const { contactsAddSchema, contactsUpdateStatusSchema } = contactSchemas;

const contactsRouter = express.Router();

contactsRouter.use(authenticateToken);

contactsRouter.get('/', getAllContact);
contactsRouter.get('/:contactId', isValidId, getContactById);
contactsRouter.post(
  '/',
  isEmptyBody,
  validateBody(contactsAddSchema),
  addContact
);
contactsRouter.put(
  '/:contactId',
  isValidId,
  isEmptyBody,
  validateBody(contactsAddSchema),
  updateContactById
);
contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyBodyStatus,
  validateBody(contactsUpdateStatusSchema),
  updateStatusContact
);
contactsRouter.delete('/:contactId', isValidId, removeContactById);

export default contactsRouter;
