import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { ITeamModel } from '../../Interfaces/ITeamModel';
import db from '.';

class SequelizeTeam extends
  Model<InferAttributes<SequelizeTeam>,
  InferCreationAttributes<SequelizeTeam>> implements ITeamModel {
  declare id: number;
  declare teamName: string;
}

SequelizeTeam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default SequelizeTeam;
