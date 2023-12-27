import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenValidation from '../middlewares/TokenValidation';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  (req: Request, res: Response) => matchController.findAll(req, res),
);

matchRouter.patch(
  '/:id/finish',
  TokenValidation.validateLogin,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/:id',
  TokenValidation.validateLogin,
  (req: Request, res: Response) => matchController.update(req, res),
);

export default matchRouter;
