import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthPayload } from './interfaces/auth-payload.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randtoken = require('rand-token');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }
  async comparePasswordNonHash(
    password: string,
    storePassword: string,
  ): Promise<boolean> {
    return password === storePassword;
  }
  async authentication(email: string, _password: string): Promise<any> {
    const user: UserEntity = await this.userService.getUserByEmail(email);
    const check = await this.comparePasswordNonHash(_password, user.password);

    if (!user || !check) {
      return false;
    }
    const result = omit(user, ['password']);
    return result;
  }

  async login(user: UserEntity) {
    const payload: AuthPayload = {
      name: null,
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.generateRefreshToken(user.id),
    };
  }
  async logout(userId: number) {
    return this.userService.update(userId, {
      refreshtoken: null,
      id: userId,
    });
  }

  async generateRefreshToken(userId: number): Promise<string> {
    const refreshToken = randtoken.generate(16);
    const expirydate = new Date();
    expirydate.setDate(expirydate.getDate() + 6);
    await this.userService.saveorupdateRefreshToken(
      refreshToken,
      userId,
      expirydate,
    );
    return refreshToken;
  }
}
