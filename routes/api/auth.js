import express from 'express';

import { authController } from '../../controllers/index.js';

import { usersSchemas } from '../../schemas/index.js';
import { validateBody } from '../../decorators/index.js';

import { authenticateToken } from '../../middlewares/index.js';

const { usersSchema, usersUpdateSubscriptionSchema } = usersSchemas;

const { register, login, logout, getCurrent, updateUserSubscription } =
  authController;

const authRouter = express.Router();

authRouter.post('/register', validateBody(usersSchema), register);
authRouter.post('/login', validateBody(usersSchema), login);
authRouter.post('/logout', authenticateToken, logout);
authRouter.get('/current', authenticateToken, getCurrent);

authRouter.patch(
  '/',
  authenticateToken,
  validateBody(usersUpdateSubscriptionSchema),
  updateUserSubscription
);

export default authRouter;
