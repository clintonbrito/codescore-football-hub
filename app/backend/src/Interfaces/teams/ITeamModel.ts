import { ICRUDModel } from '../ICRUDModel';
import { ITeam } from './ITeam';

// export interface ITeamModel {
//   id: number,
//   teamName: string,
// }

export type ITeamModel = ICRUDModel<ITeam>;
