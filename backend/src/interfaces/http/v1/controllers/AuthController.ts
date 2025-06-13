import { RequestHandler } from "express";
import { injectable, inject } from "tsyringe";
import { z } from "zod";

import { RegisterUser } from "@/application/useCases/RegisterUser.js";
import { userRegisterSchema } from "@/application/validators/registerSchema.js";
import { sendSuccess } from "@/shared/utils/response.js";
import { StatusCodes } from "http-status-codes";

@injectable()
export class AuthController {
  constructor( 
    @inject(RegisterUser) private registerUser: RegisterUser,
  ){}


  register: RequestHandler<{}, {}, z.infer<typeof userRegisterSchema>> = async (req, res, next) => {
    const { password, email, name } = req.body;
    try {
      const user = await this.registerUser.execute({
        emailOrUsername: email,
        name,
        password
      });
      sendSuccess(res, user, StatusCodes.CREATED);
    } catch (err) {
      next(err);
    }
  }
}