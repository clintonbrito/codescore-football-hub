import { ILogin } from './ILogin';
import { IUser, Role } from './IUser';

export interface ILoginModel {
  verifyUser(credentials: ILogin): Promise<string | null>
  getRole(user: IUser): Promise<Role | null>
}
