import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import {
  validatePassword,
  generateHashPassword,
} from 'src/utils/password-utils';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      username: loginDto.username,
    });

    if (!user) {
      return new BadRequestException('User not found');
    }

    const isMatch = validatePassword(loginDto.password, user.password);

    if (!isMatch) {
      return new BadRequestException('Password is incorrect');
    }

    return user;
  }

  async register(loginDto: LoginDto) {
    const { password, username } = loginDto;
    const existingUser = await this.userModel.findOne({
      username: loginDto.username,
    });

    if (existingUser) {
      return new BadRequestException('User already exists');
    }

    const hashedPassword = generateHashPassword(password);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
    });

    return user;
  }
}
