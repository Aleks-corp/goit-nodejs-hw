import express from 'express';
import {
  isEmptyBody,
  isEmptyBodyStatus,
  isValidId,
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

const router = express.Router();

router.get('/', getAllContact);
router.get('/:contactId', isValidId, getContactById);
router.post('/', isEmptyBody, validateBody(contactsAddSchema), addContact);
router.put(
  '/:contactId',
  isValidId,
  isEmptyBody,
  validateBody(contactsAddSchema),
  updateContactById
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyBodyStatus,
  validateBody(contactsUpdateStatusSchema),
  updateStatusContact
);
router.delete('/:contactId', isValidId, removeContactById);

export default router;
