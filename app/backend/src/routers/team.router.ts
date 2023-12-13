import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response) => teamController.findAll(req, res));
teamRouter.get('/:id', (req: Request, res: Response) => teamController.findById(req, res));

export default teamRouter;
