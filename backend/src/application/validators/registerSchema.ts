import { z } from "zod";

const passwordValidation = z
  .string({message: 'Password required'})
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" });


export const userRegisterSchema = z.object({
  email: z.string({message: 'Email required'}).email(),
  name: z.string({message: 'Name required'}).min(1),
  password: passwordValidation,
  confirmPassword: z.string({message: 'Confirm password required'}),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});