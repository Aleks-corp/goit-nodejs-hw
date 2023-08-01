import express from 'express';

import { authController } from '../../controllers/index.js';

import { usersSchemas } from '../../schemas/index.js';
import { validateBody } from '../../decorators/index.js';

import { authenticateToken, upload } from '../../middlewares/index.js';

const { usersSchema, usersUpdateSubscriptionSchema } = usersSchemas;

const {
  register,
  login,
  logout,
  getCurrent,
  updateUserSubscription,
  updateAvatar,
} = authController;

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
authRouter.patch(
  '/avatars',
  authenticateToken,
  upload.single('avatar'),
  updateAvatar
);

export default authRouter;
