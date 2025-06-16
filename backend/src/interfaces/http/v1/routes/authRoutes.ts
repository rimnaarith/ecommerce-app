import express from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/AuthController.js';
import { userRegisterSchema } from '@/application/validators/registerSchema.js';
import { validateBody } from '../middlewares/validateData.js';

const router = express.Router();

const authController = container.resolve(AuthController);

router.post('/register', validateBody(userRegisterSchema), authController.register);

export default router;