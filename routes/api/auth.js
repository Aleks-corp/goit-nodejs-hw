import express from 'express';

import { authController } from '../../controllers/index.js';

import { usersSchemas } from '../../schemas/index.js';
import { validateBody } from '../../decorators/index.js';

const { usersSchema, usersUpdateSubscriptionSchema } = usersSchemas;

const { register, login } = authController;

const authRouter = express.Router();

authRouter.post('/register', validateBody(usersSchema), register);
authRouter.post('/login', validateBody(usersSchema), login);

authRouter.patch('/', validateBody(usersUpdateSubscriptionSchema));

export default authRouter;
