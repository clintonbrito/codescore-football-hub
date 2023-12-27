import { Request, Response, Router } from 'express';
import NewMatchValidation from '../middlewares/NewMatchValidation';
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

matchRouter.post(
  '/',
  TokenValidation.validateLogin,
  NewMatchValidation.validateNewMatch,
  (req: Request, res: Response) => matchController.create(req, res),
);

export default matchRouter;
