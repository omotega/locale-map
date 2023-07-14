import { Router } from 'express';

const userRouter = Router();

import usercontroller from '../controllers/usercontroller';
import validation from '../middleawre/validate';

userRouter
  .route('/signup')
  .post(validation.signUpValidationMiddleware, usercontroller.signup);
userRouter
  .route('/login')
  .post(validation.loginValidationMiddleware, usercontroller.login);

export default userRouter;
