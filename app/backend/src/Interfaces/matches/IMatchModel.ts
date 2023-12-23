import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>
  findById(id: number): Promise<IMatch | null>
}
