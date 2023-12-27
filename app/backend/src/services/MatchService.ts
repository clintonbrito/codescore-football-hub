import { IMatchScore } from '../Interfaces/matches/IMatchScore';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ICRUDModelReadWithQuery } from '../Interfaces/ICRUDModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: ICRUDModelReadWithQuery<IMatch> = new MatchModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  // public async findById(id: number): Promise<ServiceResponse<IMatch | null>> {
  //   const match = await this.matchModel.findById(id);
  //   return { status: 'SUCCESSFUL', data: match };
  // }

  public async findAllInProgress(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAllInProgress();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findAllFinished(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAllFinished();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.findById(Number(id));

    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    if (!match.inProgress) {
      return { status: 'CONFLICT', data: { message: 'Match is already finished' } };
    }

    await this.matchModel.finishMatch(Number(id));

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  // public async update(id: number, { homeTeamGoals: number, awayTeamGoals: number }):
  // Promise<ServiceResponse<IMatch | null>> {
  //   const match = await this.matchModel.findById(Number(id));

  //   if (!match) {
  //     return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
  //   }

  //   if (!match.inProgress) {
  //     return { status: 'CONFLICT', data: { message: 'Match is already finished' } };
  //   }

  //   const matchUpdated = await this.matchModel.update(id);

  //   return { status: 'SUCCESSFUL', data: matchUpdated };
  // }

  public async update(id: number, matchScore: IMatchScore):
  Promise<ServiceResponse<IMatch | null>> {
    const match = await this.matchModel.findById(Number(id)); // Essa chamada/validação é desnecessária? Refatorar depois

    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    if (!match.inProgress) {
      return { status: 'CONFLICT', data: { message: 'You can not update a finished match' } };
    }

    const matchUpdated = await this.matchModel.update(id, {
      ...match,
      ...matchScore,
    });

    return { status: 'SUCCESSFUL', data: matchUpdated };
  }
}
