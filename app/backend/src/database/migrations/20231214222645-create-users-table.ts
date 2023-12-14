import { QueryInterface, DataTypes, Model } from 'sequelize';

interface IUserMigration {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export default {
  up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUserMigration>>('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  }
};