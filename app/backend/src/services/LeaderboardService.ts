import { ILeaderboardModel } from '../Interfaces/leaderboards/ILeaderboardModel';
import { ILeaderboardTeam } from '../Interfaces/leaderboards/ILeaderboardTeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel<ILeaderboardTeam> = new LeaderboardModel(),
  ) { }

  public async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboardTeam[]>> {
    const homeLeaderboard = await this.leaderboardModel.getHomeLeaderboard();

    return { status: 'SUCCESSFUL', data: homeLeaderboard };
  }

  public async getAwayLeaderboard(): Promise<ServiceResponse<ILeaderboardTeam[]>> {
    const awayLeaderboard = await this.leaderboardModel.getAwayLeaderboard();

    return { status: 'SUCCESSFUL', data: awayLeaderboard };
  }

  public async getCompleteLeaderboard(): Promise<ServiceResponse<ILeaderboardTeam[]>> {
    const completeLeaderboard = await this.leaderboardModel.getCompleteLeaderboard();

    return { status: 'SUCCESSFUL', data: completeLeaderboard };
  }
}
