import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const teams = await this.teamService.findAll();
    return res.status(mapStatusHTTP(teams.status)).json(teams.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.findById(Number(id));
    return res.status(mapStatusHTTP(team.status)).json(team.data);
  }
}
