import { AuthFailureError } from '../core/apierror';
import { jwtPayloads } from '../utils/jwt';
import config from '../config/env';
import { Types } from 'mongoose';
import { Iuser } from '../database/model/usermodel';
import JWT from '../utils/jwt';
import { INTERNAL_SERVER_ERROR } from '../utils/constant';

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer'))
    throw new AuthFailureError('Invalid Authorization');
  return authorization.split(' ')[1];
};

export const validateTokenData = (payload: jwtPayloads): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== config.issuer ||
    payload.aud !== config.audience ||
    !Types.ObjectId.isValid(payload.sub)
  )
    throw new AuthFailureError('Invalid access token');
  return true;
};

export const createToken = async (
  user: Iuser,
  accessTokenKey: string,
  refreshTokenKey: string
) => {
  const accessToken = await JWT.encode(
    new jwtPayloads(
      config.issuer,
      config.audience,
      user._id?.toString() as string,
      accessTokenKey,
      config.accessTokenValidity
    )
  );
  if (!accessToken) return INTERNAL_SERVER_ERROR;

  const refreshToken = await JWT.encode(
    new jwtPayloads(
      config.issuer,
      config.audience,
      user._id?.toString() as string,
      refreshTokenKey,
      config.refreshTokenValidity
    )
  );
  if (!refreshToken) return INTERNAL_SERVER_ERROR;

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
};
