import { Request, Response } from 'express';
import locationrepo from '../database/repo/location';
import { errorResponse, handleError, successResponse } from '../core/response';
import {
  LGA_FOUND,
  LGA_NOT_FOUND,
  REGION_FOUND,
  REGION_NOT_FOUND,
  SOMETHING_HAPPENED,
  STATE_FOUND,
  STATE_NOT_FOUND
} from '../utils/constant';
import helper from '../utils/helper';
import Cache from '../config/redis';

const searchByRegion = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;
    const queryValue = await helper.capitalizeFirstletter(region);
    const data = await locationrepo.searchByRegion(queryValue);
    const dataId = await helper.genRandomStrings();
    const cacheKey = `locale:${dataId}`;
    Cache.redis.set(cacheKey, JSON.stringify(data));
    if (!data) errorResponse(res, 404, REGION_NOT_FOUND);
    successResponse(res, 200, REGION_FOUND, { data });
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
};

const searchByState = async (req: Request, res: Response) => {
  try {
    const { state } = req.query;
    const queryValue = await helper.capitalizeFirstletter(state);
    const data = await locationrepo.searchByState(queryValue);
    const dataId = await helper.genRandomStrings();
    const cacheKey = `locale:${dataId}`;
    Cache.redis.set(cacheKey, JSON.stringify(data));
    if (!data) errorResponse(res, 404, STATE_NOT_FOUND);
    successResponse(res, 200, STATE_FOUND, { data });
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
};

const searchByLga = async (req: Request, res: Response) => {
  try {
    const { lga } = req.query;
    const queryValue = await helper.capitalizeFirstletter(lga);
    const data = await locationrepo.searchByLga(queryValue);
    const dataId = await helper.genRandomStrings();
    const cacheKey = `locale:${dataId}`;
    Cache.redis.set(cacheKey, JSON.stringify(data));
    if (!data) errorResponse(res, 404, LGA_NOT_FOUND);
    successResponse(res, 200, LGA_FOUND, { data });
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
};

const searchRegionwithState = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;
    const queryValue = await helper.capitalizeFirstletter(region);
    const data = await locationrepo.searchByRegionWithState(queryValue);
    const dataId = await helper.genRandomStrings();
    const cacheKey = `locale:${dataId}`;
    Cache.redis.set(cacheKey, JSON.stringify(data));
    if (!data) errorResponse(res, 404, REGION_NOT_FOUND);
    successResponse(res, 200, REGION_FOUND, { data });
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
};

const searchForStateWithLga = async (req: Request, res: Response) => {
  try {
    const { state } = req.query;
    const queryValue = await helper.capitalizeFirstletter(state);
    const data = await locationrepo.searchForStateWithLga(queryValue);
    const dataId = await helper.genRandomStrings();
    const cacheKey = `locale:${dataId}`;
    Cache.redis.set(cacheKey, JSON.stringify(data));
    if (!data) errorResponse(res, 404, STATE_NOT_FOUND);
    successResponse(res, 200, STATE_FOUND, { data });
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
};

export default {
  searchByRegion,
  searchByState,
  searchByLga,
  searchRegionwithState,
  searchForStateWithLga
};
