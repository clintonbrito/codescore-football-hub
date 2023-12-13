import { ICRUDModelRead } from '../Interfaces/ICRUDModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ICRUDModelRead<ITeam> {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
