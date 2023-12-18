import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const credentials = req.body;

    const token = await this.loginService.login(credentials);

    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json(token.data);
  }
}
