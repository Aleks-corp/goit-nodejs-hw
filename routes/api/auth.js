import express from 'express';

import { authController } from '../../controllers/index.js';

import { usersSchemas } from '../../schemas/index.js';
import { validateBody } from '../../decorators/index.js';

import { authenticateToken, upload } from '../../middlewares/index.js';

const { usersSchema, usersUpdateSubscriptionSchema, usersVerifySchema } =
  usersSchemas;

const {
  register,
  login,
  logout,
  getCurrent,
  updateUserSubscription,
  updateAvatar,
  getVerification,
  resendVerify,
} = authController;

const authRouter = express.Router();

authRouter.post('/register', validateBody(usersSchema), register);
authRouter.post('/login', validateBody(usersSchema), login);
authRouter.post('/logout', authenticateToken, logout);
authRouter.get('/current', authenticateToken, getCurrent);
authRouter.get('/verify/:verificationToken', getVerification);
authRouter.post('/verify', validateBody(usersVerifySchema), resendVerify);

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
