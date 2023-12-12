import { Model, QueryInterface, DataTypes } from "sequelize";

interface ITeamMigration {
  id: number,
  team_name: string,
}

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeamMigration>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      team_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams')
  }
}