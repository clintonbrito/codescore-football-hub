import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/users/ILogin';
import SequelizeUser from '../database/models/SequelizeUser';
import { ILoginModel } from '../Interfaces/users/ILoginModel';
import JWT from '../utils/JWT';
import { IUser, Role } from '../Interfaces/users/IUser';

export default class LoginModel implements ILoginModel {
  private model = SequelizeUser;

  public async verifyUser(credentials: ILogin): Promise<string | null> {
    const user = await this.model.findOne({ where: { email: credentials.email } });

    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return null;
    }

    const token = JWT.sign({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    });

    return token;
  }

  public async getRole(user: IUser): Promise<Role | null> {
    const userExists = await this.model.findOne({ where: { email: user.email } });

    if (!userExists) {
      return null;
    }

    return { role: userExists.dataValues.role };
  }
}
