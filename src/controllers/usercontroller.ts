import { Request, Response } from 'express';
import userrepo from '../database/repo/userrepo';
import {
  INCORRECT_PASSWORD,
  LOGIN_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
  SOMETHING_HAPPENED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXIST
} from '../utils/constant';
import helper from '../utils/helper';
import { errorResponse, handleError, successResponse } from '../core/response';

async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const userExist = await userrepo.findUserByEmail(email);
    if (userExist) errorResponse(res, 400, USER_ALREADY_EXISTS);
    const hash = await helper.hashPassword(password);
    const apiKey = await helper.genApiKey();
    const user = await userrepo.create({
      name: name,
      email: email,
      password: hash,
      apiKey: apiKey
    });
    successResponse(res, 201, SIGNUP_SUCCESSFUL, { user: user });
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
}
async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await userrepo.findUserByEmail(email);
    if (!user) errorResponse(res, 404, USER_DOES_NOT_EXIST);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isPaasword = await helper.comparePassword(user?.password, password);
    if (!isPaasword) errorResponse(res, 400, INCORRECT_PASSWORD);
    successResponse(res, 200, LOGIN_SUCCESSFUL, { userDetails: user });
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
}

export default {
  signup,
  login
};
