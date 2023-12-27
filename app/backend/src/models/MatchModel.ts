import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchScore } from '../Interfaces/matches/IMatchScore';

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

  public async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (match) {
      return match.dataValues;
    }

    return null;
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

  public async finishMatch(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (match) {
      await match.update({ inProgress: false });
    }

    return match;
  }

  public async update(id: number, matchScore: IMatchScore): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);

    if (match) {
      await match.update(matchScore, { where: { id } });
    }

    return match;
  }

  public async create(match: IMatch): Promise<IMatch> {
    const newMatch = await this.model.create({
      ...match,
      inProgress: true,
    });

    return newMatch;
  }
}
