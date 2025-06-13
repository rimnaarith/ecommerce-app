import jwt from 'jsonwebtoken';
import { UserJwtPayload, JwtObjPayload } from '../types/userTypes.js';
import { Response } from 'express';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

function generateAccessToken(payload: UserJwtPayload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}


function generateRefreshToken(payload: UserJwtPayload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

function verifyToken(token: string, type: 'access' | 'refress' = 'access') {
  return new Promise<JwtObjPayload>((resolve, reject) => {
    jwt.verify(token, type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET, (err, paylod) => {
      if (err) {
        reject(err)
      }
      resolve(paylod as JwtObjPayload)
    })
  })
}

/**
 * Set refresh to cookie
 * @param res 
 * @param refreshToken 
 */
function setRefreshToken(res: Response, refreshToken: string) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true: false,
    sameSite: 'strict',  
    maxAge: 7 * 24 * 60 * 60 * 1000 //One week
  })
}

export {
  generateAccessToken, 
  generateRefreshToken,
  verifyToken,
  setRefreshToken
}