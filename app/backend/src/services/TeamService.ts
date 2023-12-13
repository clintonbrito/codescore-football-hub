import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ICRUDModelRead } from '../Interfaces/ICRUDModel';
import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ICRUDModelRead<ITeam> = new TeamModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);
    return { status: 'SUCCESSFUL', data: team };
  }
}
