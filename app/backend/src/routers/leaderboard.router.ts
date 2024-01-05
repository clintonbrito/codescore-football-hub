import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeLeaderboard(req, res),
);

leaderboardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAwayLeaderboard(req, res),
);

leaderboardRouter.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getCompleteLeaderboard(req, res),
);

export default leaderboardRouter;
