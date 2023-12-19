import { ILoginService, IUserWithRole } from '../Interfaces/users/ILoginService';
import { ILogin } from '../Interfaces/users/ILogin';
import { ILoginModel } from '../Interfaces/users/ILoginModel';
import LoginModel from '../models/LoginModel';
import { IUser } from '../Interfaces/users/IUser';

export default class LoginService {
  constructor(
    private loginModel: ILoginModel = new LoginModel(),
  ) { }

  public async login(credentials: ILogin):Promise<ILoginService | null> {
    const token = await this.loginModel.verifyUser(credentials);

    if (!token) {
      return null;
    }

    return { status: 200, data: { token } };
  }

  public async getRole(user: IUser): Promise<IUserWithRole | null> {
    const userExists = await this.loginModel.getRole(user);

    if (!userExists) {
      return null;
    }

    return { status: 200, data: userExists };
  }
}
