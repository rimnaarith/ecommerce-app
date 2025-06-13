import { type DEBUG } from './src/config/debug.js';
import { JwtObjPayload } from '@/shared/types/userTypes.ts';
declare global {
  /**
   * Debug
   */
  var D: DEBUG;

  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT?: string;  // Optional environment variable
      NODE_ENV?: string;
    }
  }
  namespace Express {
    interface Request {
      payload?: JwtObjPayload
    }
  }
}
export {}