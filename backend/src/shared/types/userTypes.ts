import { JwtPayload } from 'jsonwebtoken';

type UserJwtPayload = {
  userId: string;
  username: string;
}
type JwtObjPayload = JwtPayload & UserJwtPayload


export type {
  UserJwtPayload,
  JwtObjPayload
};