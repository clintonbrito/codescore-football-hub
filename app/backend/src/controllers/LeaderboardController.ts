import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getHomeLeaderboard(_req: Request, res: Response) {
    const homeLeaderboard = await this.leaderboardService.getHomeLeaderboard();

    return res.status(mapStatusHTTP(homeLeaderboard.status)).json(homeLeaderboard.data);
  }

  public async getAwayLeaderboard(_req: Request, res: Response) {
    const awayLeaderboard = await this.leaderboardService.getAwayLeaderboard();

    return res.status(mapStatusHTTP(awayLeaderboard.status)).json(awayLeaderboard.data);
  }

  public async getCompleteLeaderboard(_req: Request, res: Response) {
    const completeLeaderboard = await this.leaderboardService.getCompleteLeaderboard();

    return res.status(mapStatusHTTP(completeLeaderboard.status)).json(completeLeaderboard.data);
  }
}
