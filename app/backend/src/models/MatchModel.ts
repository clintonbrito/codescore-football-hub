import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel {
  private model = SequelizeMatch;

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const matchesWithCompleteData = matches.map((match) => match.dataValues);
    // console.log(matchesWithCompleteData);

    return matchesWithCompleteData;
  }

  public async findAllInProgress(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: true,
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const matchesWithCompleteData = matches.map((match) => match.dataValues);

    return matchesWithCompleteData;
  }

  public async findAllFinished(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: false,
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const matchesWithCompleteData = matches.map((match) => match.dataValues);

    return matchesWithCompleteData;
  }

  // public async update(id: number): Promise<IMatch | null> {
  //   const match = await this.model.findByPk(id, {
  //     include: [
  //       { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
  //       { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
  //     ],
  //   });
  //   return match;
  // }
}
