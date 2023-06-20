import { Request, Response, NextFunction } from 'express';

import userValidation from '../validation/user';
import { errorResponse, handleError, validationErrors } from '../core/response';
import { SOMETHING_HAPPENED } from '../utils/constant';

function signUpValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payload = req.payload;
  try {
    const validate = userValidation.signUpValidation(payload);
    if (validate.error)
      return validationErrors(res, 400, validate.error.details[0].message);
    next();
  } catch (error) {
    handleError(req, error);
    errorResponse(res, 500, SOMETHING_HAPPENED);
  }
}

export default signUpValidationMiddleware;
