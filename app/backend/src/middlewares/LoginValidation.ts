import { NextFunction, Request, Response } from 'express';
import loginSchema from '../utils/schemas';

export default class LoginValidation {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    next();
  }
}
