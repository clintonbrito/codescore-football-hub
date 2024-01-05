import { QueryTypes } from 'sequelize';
import Sequelize from '../database/models';
import { ILeaderboardTeam } from '../Interfaces/leaderboards/ILeaderboardTeam';
import { ILeaderboardModel } from '../Interfaces/leaderboards/ILeaderboardModel';
import queries from '../utils/queries';

export default class LeaderboardModel implements ILeaderboardModel<ILeaderboardTeam> {
  private sequelize = Sequelize;

  public async getHomeLeaderboard(): Promise<ILeaderboardTeam[]> {
    const homeLeaderboard = await this.sequelize.query(
      queries.homeLeaderboardQuery,
      { type: QueryTypes.SELECT },
    );

    return homeLeaderboard as ILeaderboardTeam[];
  }

  public async getAwayLeaderboard(): Promise<ILeaderboardTeam[]> {
    const awayLeaderboard = await this.sequelize.query(
      queries.awayLeaderboardQuery,
      { type: QueryTypes.SELECT },
    );

    return awayLeaderboard as ILeaderboardTeam[];
  }

  public async getCompleteLeaderboard(): Promise<ILeaderboardTeam[]> {
    const completeLeaderboard = await this.sequelize.query(
      queries.completeLeaderboardQuery,
      { type: QueryTypes.SELECT },
    );

    return completeLeaderboard as ILeaderboardTeam[];
  }
}
