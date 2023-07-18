import express from 'express';
import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { contactSchemas } from '../../schemas/index.js';
import { contactsController } from '../../controllers/index.js';

const { getAll, getById, add, updateById, removeById } = contactsController;
const { contactsAddSchema } = contactSchemas;

const router = express.Router();

router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', isEmptyBody, validateBody(contactsAddSchema), add);
router.put(
  '/:contactId',
  isEmptyBody,
  validateBody(contactsAddSchema),
  updateById
);
router.delete('/:contactId', removeById);

export default router;
