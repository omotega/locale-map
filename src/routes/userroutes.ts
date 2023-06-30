import { Router } from 'express';

const userRouter = Router();

import usercontroller from '../controllers/usercontroller';
import signUpValidationMiddleware from '../middleawre/validate';

userRouter
  .route('/signup')
  .post(signUpValidationMiddleware, usercontroller.signup);
userRouter.route('/login').post(usercontroller.login);

export default userRouter;
