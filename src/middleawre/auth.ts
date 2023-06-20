import { Request, Response, NextFunction } from 'express';
import userRepo from '../database/repo/userrepo';
import logger from '../core/logger';
import { errorResponse } from '../core/response';
import { AUTHORIZATION_NOT_FOUND, INCORRECT_API_KEY } from '../utils/constant';

async function addAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return errorResponse(res, 404, AUTHORIZATION_NOT_FOUND);
    const user = await userRepo.findUserByApiKey(authorization);
    if (authorization !== user?.apiKey)
      return errorResponse(res, 400, INCORRECT_API_KEY);
    return next();
  } catch (error: any) {
    logger.debug(error);
    return errorResponse(res, 500, error.message);
  }
}

export default addAuthorization;
