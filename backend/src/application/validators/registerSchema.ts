import { z } from 'zod';

const usernameSchema = z.string()
  .min(3, 'Username must be at least 3 characters long')
  .max(20, 'Username must be at most 20 characters long')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');

const emailSchema = z.string().email('Invalid email address');

const usernameOrEmailSchema = z.union([usernameSchema, emailSchema]);

const passwordValidation = z
  .string({message: 'Password required'})
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' });


export const userRegisterSchema = z.object({
  email: usernameOrEmailSchema,
  name: z.string({message: 'Name required'}).min(1),
  password: passwordValidation,
  confirmPassword: z.string({message: 'Confirm password required'}),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});