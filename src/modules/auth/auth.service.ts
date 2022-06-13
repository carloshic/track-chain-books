import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user';
import { ILogin } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(input: ILogin) {
    const user = await this.userService.findOne({
      username: input.username,
    });

    if (!user) {
      throw new NotAcceptableException('INVALID_CREDENTIALS');
    }

    if (!user.active) {
      throw new NotAcceptableException('USER_INACTIVE');
    }

    if (!bcrypt.compareSync(input.password, user.password)) {
      throw new NotAcceptableException('INVALID_PASSWORD');
    }

    const expiresIn = 3600;

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn },
    );

    return {
      accessToken: token,
      expiresIn,
    };
  }
}
