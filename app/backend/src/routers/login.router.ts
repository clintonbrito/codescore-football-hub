import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidation from '../middlewares/LoginValidation';
import TokenValidation from '../middlewares/TokenValidation';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  LoginValidation.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);

loginRouter.get(
  '/role',
  TokenValidation.validateLogin,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default loginRouter;
