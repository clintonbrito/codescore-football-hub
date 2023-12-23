import { IMatch } from '../Interfaces/matches/IMatch';
import { ICRUDModelReadWithQuery } from '../Interfaces/ICRUDModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: ICRUDModelReadWithQuery<IMatch> = new MatchModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findAllInProgress(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAllInProgress();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findAllFinished(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAllFinished();
    return { status: 'SUCCESSFUL', data: matches };
  }

  // public async update(id: number): Promise<ServiceResponse<IMatch | null>> {
  //   const match = await this.matchModel.findById(id);
  //   return { status: 'SUCCESSFUL', data: match };
  // }
}
