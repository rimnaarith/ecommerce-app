import { type DEBUG } from './src/config/debug';
import { JwtObjPayload } from '@v1/types/userTypes';
declare global {
  /**
   * Debug
   */
  var D: DEBUG;

  declare namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT?: string;  // Optional environment variable
      NODE_ENV?: String | 'production';
    }
  }
  namespace Express {
    interface Request {
      payload?: JwtObjPayload
    }
  }
}
export {}