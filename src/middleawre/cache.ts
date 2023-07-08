import { Request, Response, NextFunction } from 'express';
import Cache from '../config/redis';
import helper from '../utils/helper';
import logger from '../core/logger';
import { errorResponse } from '../core/response';

const CacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataId = await helper.genRandomStrings();

    const cacheKey = `locale:${dataId}`;

    const cacheddata = await Cache.redis.get(cacheKey);

    if (cacheddata) {
      return res.json({ status: true, Data: JSON.parse(cacheddata) });
    }

    next();
  } catch (error: any) {
    logger.debug(error);
    errorResponse(res, 500, error.message);
  }
};

export default CacheMiddleware;
