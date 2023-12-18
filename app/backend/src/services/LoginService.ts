import { ILoginService } from '../Interfaces/users/ILoginService';
import { ILogin } from '../Interfaces/users/ILogin';
import { ILoginModel } from '../Interfaces/users/ILoginModel';
import LoginModel from '../models/LoginModel';

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

  // public async login(credentials: ILogin): Promise<ServiceResponse<ILoginService>> {
  //   const token = await this.loginModel.verifyUser(credentials);

  //   if (!token) {
  //     return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  //   }

  //   return { status: 'SUCCESSFUL', data: { token } };
  // }
}
