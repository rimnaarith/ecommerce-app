import express from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/AuthController";
import { userRegisterSchema } from "@/application/validators/registerSchema";
import { validateBody } from "../middlewares/validateData";

userRegisterSchema.parse

const router = express.Router();

const authController = container.resolve(AuthController);

router.post('/register', validateBody(userRegisterSchema), authController.register)

export default router