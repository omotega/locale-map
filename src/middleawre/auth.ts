import { Request, Response, NextFunction } from 'express';
import userRepo from '../database/repo/userrepo';
import logger from '../core/logger';
import { errorResponse, handleError } from '../core/response';
import {
  AUTHORIZATION_NOT_FOUND,
  INCORRECT_API_KEY,
  USER_NOT_FOUND
} from '../utils/constant';
import { getAccessToken, validateTokenData } from '../auth/authUtils';
import jwt from '../utils/jwt';
import userrepo from '../database/repo/userrepo';

async function addAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return errorResponse(res, 404, AUTHORIZATION_NOT_FOUND);
    const user = await userRepo.findUserByApiKey(authorization);
    if (!user) errorResponse(res, 404, USER_NOT_FOUND);
    if (authorization !== user?.apiKey)
      errorResponse(res, 400, INCORRECT_API_KEY);
    return next();
  } catch (error: any) {
    logger.debug(error);
    errorResponse(res, 500, error.message);
  }
}

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers && req.headers.authorization) {
      const Header = req.headers.authorization;
      const token = getAccessToken(Header);
      const decoded: any = await jwt.decode(token);
      const user = await userrepo.findUserById(decoded._id);
      if (!user) return errorResponse(res, 404, 'User not found');
      req.User = decoded;

      return next();
    } else {
      errorResponse(res, 403, 'incorrect validation');
    }
  } catch (error: any) {
    handleError(req, error);
    return errorResponse(res, 500, error.message);
  }
}

export default addAuthorization;
