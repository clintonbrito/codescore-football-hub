export interface ILeaderboardModel<T> {
  getHomeLeaderboard(): Promise<T[]>;
  getAwayLeaderboard(): Promise<T[]>;
  getCompleteLeaderboard(): Promise<T[]>;
}
