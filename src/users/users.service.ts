import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UserSchema from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<{ name: 'User'; schema: typeof UserSchema }>,
  ) {}

  async create(createUserBody) {
    const createdUser = new this.userModel(createUserBody);
    return createdUser.save();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
