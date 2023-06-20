import { sign, verify } from 'jsonwebtoken';
import logger from '../core/logger';
import config from '../config/env';
import { BadTokenError, TokenExpiredError } from '../core/apierror';

export class jwtPayloads {
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  prm: string;

  constructor(
    issuer: string,
    audience: string,
    subject: string,
    params: string,
    validity: number
  ) {
    (this.iss = issuer),
      (this.aud = audience),
      (this.sub = subject),
      (this.iat = Math.floor(Date.now() / 1000));
    this.exp = this.iat + validity;
    this.prm = params;
  }
}

async function encode(payload: jwtPayloads): Promise<string> {
  const token = sign({ ...payload }, config.cert);
  return token;
}

async function validate(token: string): Promise<jwtPayloads> {
  try {
    const payload = (await verify(token, config.cert)) as jwtPayloads;
    return payload;
  } catch (error: any) {
    logger.debug(error);
    if (error && error.name === 'TokenExpiredError')
      throw new TokenExpiredError();
    throw new BadTokenError();
  }
}

async function decode(token: string): Promise<jwtPayloads> {
  try {
    const payload = (await verify(token, config.cert, {
      ignoreExpiration: true
    })) as jwtPayloads;
    return payload;
  } catch (error) {
    logger.debug(error);
    throw new BadTokenError();
  }
}

export default {
  encode,
  validate,
  decode
};
