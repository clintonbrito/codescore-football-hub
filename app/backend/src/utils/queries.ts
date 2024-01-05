const homeLeaderboardQuery = `
SELECT
t.team_name AS name,
COUNT(m.id) AS totalGames,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3
         WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
         ELSE 0 END) AS totalPoints,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 1
         ELSE 0 END) AS totalVictories,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
         ELSE 0 END) AS totalDraws,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals < m.away_team_goals THEN 1
         ELSE 0 END) AS totalLosses,
SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals
         ELSE 0 END) AS goalsFavor,
SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals
         ELSE 0 END) AS goalsOwn,
SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals - m.away_team_goals
         ELSE 0 END) AS goalsBalance,
CASE WHEN COUNT(m.id) > 0
THEN ROUND((SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3
  WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
  ELSE 0 END) / (COUNT(m.id) * 3)) * 100, 2)
     ELSE 0 END AS efficiency
FROM
teams t
LEFT JOIN
matches m ON t.id = m.home_team_id
WHERE
m.in_progress = 0
GROUP BY
t.id, t.team_name
ORDER BY
totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC
`;

const awayLeaderboardQuery = `
SELECT
t.team_name AS name,
COUNT(m.id) AS totalGames,
SUM(CASE WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
         WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
         ELSE 0 END) AS totalPoints,
SUM(CASE WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 1
         ELSE 0 END) AS totalVictories,
SUM(CASE WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
         ELSE 0 END) AS totalDraws,
SUM(CASE WHEN m.away_team_id = t.id AND m.away_team_goals < m.home_team_goals THEN 1
         ELSE 0 END) AS totalLosses,
SUM(CASE WHEN m.away_team_id = t.id THEN m.away_team_goals
         ELSE 0 END) AS goalsFavor,
SUM(CASE WHEN m.away_team_id = t.id THEN m.home_team_goals
         ELSE 0 END) AS goalsOwn,
SUM(CASE WHEN m.away_team_id = t.id THEN m.away_team_goals - m.home_team_goals
         ELSE 0 END) AS goalsBalance,
CASE WHEN COUNT(m.id) > 0
THEN ROUND((SUM(CASE WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
  WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
  ELSE 0 END) / (COUNT(m.id) * 3)) * 100, 2)
     ELSE 0 END AS efficiency
FROM
teams t
LEFT JOIN
matches m ON t.id = m.away_team_id
WHERE
m.in_progress = 0
GROUP BY
t.id, t.team_name
ORDER BY
totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC
`;

const completeLeaderboardQuery = `
SELECT
t.team_name AS name,
COUNT(m.id) AS totalGames,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3
          WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
          WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
          WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
          ELSE 0 END) AS totalPoints,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 1
          WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 1
          ELSE 0 END) AS totalVictories,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
          WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
          ELSE 0 END) AS totalDraws,
SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals < m.away_team_goals THEN 1
          WHEN m.away_team_id = t.id AND m.away_team_goals < m.home_team_goals THEN 1
          ELSE 0 END) AS totalLosses,
SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals
          WHEN m.away_team_id = t.id THEN m.away_team_goals
          ELSE 0 END) AS goalsFavor,
SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals
          WHEN m.away_team_id = t.id THEN m.home_team_goals
          ELSE 0 END) AS goalsOwn,
SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals - m.away_team_goals
          WHEN m.away_team_id = t.id THEN m.away_team_goals - m.home_team_goals
          ELSE 0 END) AS goalsBalance,
CASE WHEN COUNT(m.id) > 0
    THEN ROUND((SUM(CASE WHEN (m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals) 
      OR (m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals) THEN 3
      WHEN (m.home_team_id = t.id OR m.away_team_id = t.id) 
      AND m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0 END) / (COUNT(m.id) * 3)) * 100, 2)
    ELSE 0 END AS efficiency
FROM
    teams t
LEFT JOIN
    matches m ON t.id = m.home_team_id OR t.id = m.away_team_id
WHERE
    m.in_progress = 0
GROUP BY
    t.id, t.team_name
ORDER BY
    totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

export default {
  homeLeaderboardQuery,
  awayLeaderboardQuery,
  completeLeaderboardQuery,
};
