import { ILogin } from './ILogin';

export interface ILoginModel {
  verifyUser(credentials: ILogin): Promise<string | null>
}
