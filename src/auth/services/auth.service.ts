import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/services/users.service';

import { IPayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if(user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const { role, id } = user;
    const payload: IPayloadToken = { role, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }

}
