import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  // public async findAll(_req: Request, res: Response) {
  //   const matches = await this.matchService.findAll();
  //   return res.status(mapStatusHTTP(matches.status)).json(matches.data);
  // }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const matches = await this.matchService.findAllInProgress();
      return res.status(mapStatusHTTP(matches.status)).json(matches.data);
    }

    if (inProgress === 'false') {
      const matches = await this.matchService.findAllFinished();
      return res.status(mapStatusHTTP(matches.status)).json(matches.data);
    }

    const matches = await this.matchService.findAll();
    return res.status(mapStatusHTTP(matches.status)).json(matches.data);
  }

  // public async update(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const match = await this.matchService.findById(Number(id));
  //   return res.status(mapStatusHTTP(match.status)).json(match.data);
  // }
}
