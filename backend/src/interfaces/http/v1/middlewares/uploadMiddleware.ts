import fs from 'fs/promises';
import multer, { MulterError } from 'multer';
import path from 'path';
import { AppError } from '@/shared/errors/AppError.js';
import { StatusCodes } from 'http-status-codes';
import { ErrorRequestHandler } from 'express';
import { UPLOAD_DIR, uploadLoadOption } from '@/shared/constants/commont.const.js';

const storage = (...subDirs: string[]) => multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      const uploadDir = path.join(UPLOAD_DIR, ...subDirs);
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      // @ts-ignore
      cb(err);
    }
  },
  filename: (_req, file, cb) => {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, Math.round(Math.random() * 1E9).toString(36)[0] || '0');
    cb(null, uniqueId + path.extname(file.originalname));
  }

});
type MulterOpt = Omit<multer.Options, 'storage' | 'dest'> & {subDirs: string[]}
const upload = (
  {
    fileFilter,
    limits,
    preservePath,
    subDirs
  }: MulterOpt
) =>  multer({ 
  storage: storage(...subDirs),
  fileFilter,
  limits,
  preservePath
});

type UploadError = (msg?: {[x in multer.ErrorCode]?: string}) => ErrorRequestHandler
const uploadError: UploadError = (msg) => (err, _req, _res, next) => {
  if (err instanceof MulterError) {
   next(new AppError(msg?.[err.code] ?? err.code, StatusCodes.BAD_REQUEST))
  } else if (err instanceof AppError) {
    next(err)
  } else {
    next(new AppError(!err.message || process.env.NODE_ENV === 'production'? 'Something went wrong.' : err.message))
  }
}

/* ============================================== 
 *  Avatar upload
 * =============================================== */
const uploadAvatar = upload({
  fileFilter: (_req, file, cb) => {
    const allowedTypes = uploadLoadOption.uploadAvatar.allowedTypes;
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new AppError(uploadLoadOption.uploadAvatar.errorMsg.allowedTypes, StatusCodes.BAD_REQUEST));
    }
    cb(null, true);
  }, 
  limits: {
    fileSize: uploadLoadOption.uploadAvatar.maxFileSize,
  }, 
  subDirs: uploadLoadOption.uploadAvatar.subDir
})
const uploadAvatarError = uploadError({
  LIMIT_FILE_SIZE: uploadLoadOption.uploadAvatar.errorMsg.limitFileSize,
  LIMIT_UNEXPECTED_FILE: 'UNEXPECTED_FILE'
})
/* ============================================== 
 *  Avatar upload
 * =============================================== */


export {
  uploadAvatar,
  uploadAvatarError
}