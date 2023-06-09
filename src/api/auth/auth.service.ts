import { hash, compare } from 'bcryptjs';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt/dist';

import { Errors } from 'src/utils';
import { Config } from 'src/modules';
import {
  CreateUserDto as SignupDto,
  LoginUserDto,
  Users,
  UsersDocument,
  OrderService,
} from 'src/api';
import { Token, TokenDocument } from './auth.entity';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: Users;
  tokens: ITokens;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService,
    @Inject(forwardRef(() => OrderService)) private orderService: OrderService,
  ) {}

  async onCreateOrder(user: any): Promise<void> {
    await this.orderService.create({
      delivery: true,
      paymentsType: 'cash',
      status: 'not_paid',
      authorId: user._id,
    });
  }

  async signup({ email, name, password }: SignupDto): Promise<IAuthResponse> {
    const emailIsExist = await this.usersModel.findOne({ email });

    if (emailIsExist)
      throw Errors.badRequest('User with this email already exists');

    const hashPassword = await hash(password, 7);
    const createdUser = await this.usersModel.create({
      email,
      name,
      password: hashPassword,
      providers: ['pass'],
      createdAt: Date.now(),
    });

    const tokens = await this.generateAndSaveTokens(createdUser);
    await this.onCreateOrder(createdUser);

    return { user: createdUser, tokens };
  }

  async authByGoogle(credential: string): Promise<IAuthResponse> {
    const userData: any = this.jwtService.decode(credential);

    if (!userData?.email) throw Errors.undefinedError();
    const emailIsExist = await this.usersModel.findOne({
      email: userData?.email,
    });

    let user = emailIsExist;

    if (!emailIsExist) {
      user = await this.usersModel.create({
        email: userData?.email,
        name: userData?.name || '',
        avatar: userData?.picture || '',
        providers: ['google'],
        createdAt: Date.now(),
      });
      await this.onCreateOrder(user);
    }

    if (!user && !emailIsExist) return;

    const tokens = await this.generateAndSaveTokens(user);
    return { user, tokens };
  }

  async login(loginDto: LoginUserDto): Promise<IAuthResponse> {
    const user = await this.usersModel.findOne({ email: loginDto.email });

    if (!user) throw Errors.notFound('User');
    if (!user?.password) throw Errors.badRequest('Try another sign in method');

    const isPassEqual = await compare(loginDto.password, user?.password);
    if (!isPassEqual) throw Errors.badRequest('Password is wrong');

    const tokens = await this.generateAndSaveTokens(user);
    return { user, tokens };
  }

  async generateTokens({ _id, email }: UsersDocument): Promise<ITokens> {
    const accessToken = this.jwtService.sign(
      { email, _id },
      { expiresIn: '15m', secret: Config.accessSecret },
    );
    const refreshToken = this.jwtService.sign(
      { email, _id },
      { expiresIn: '30d', secret: Config.refreshSecret },
    );

    return { accessToken, refreshToken };
  }

  async saveTokens(userID: string, refreshToken: string): Promise<void> {
    const token = await this.tokenModel.findOne({ userID });

    if (token) {
      token.refreshToken = refreshToken;
      await token.save();
    } else {
      await this.tokenModel.create({ userID, refreshToken });
    }
  }

  async generateAndSaveTokens(user: UsersDocument): Promise<ITokens> {
    const tokens = await this.generateTokens(user);
    await this.saveTokens(user?._id + '', tokens.refreshToken);

    return tokens;
  }

  async deleteToken(obj: {
    userID?: string;
    refreshToken?: string;
  }): Promise<void> {
    await this.tokenModel.findOneAndDelete(obj);
  }

  async validateToken(token: string, isRefresh?: boolean) {
    try {
      return await this.jwtService.verify(token, {
        secret: isRefresh ? Config.refreshSecret : Config.accessSecret,
      });
    } catch (error) {
      return false;
    }
  }

  async getToken(refreshToken: string): Promise<TokenDocument | null> {
    try {
      return await this.tokenModel.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }

  async refresh(refreshToken: string): Promise<IAuthResponse> {
    if (!refreshToken) {
      throw Errors.unauthorized();
    }
    const tokenIsValid = await this.validateToken(refreshToken, true);
    const tokenData = await this.getToken(refreshToken);

    if (!tokenData || !tokenIsValid) {
      throw Errors.unauthorized();
    }

    const user = await this.usersModel.findById(tokenData.userID);
    const tokens = await this.generateAndSaveTokens(user);

    return { tokens, user };
  }
}
