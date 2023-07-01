import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private userModel: Model<"User">) {}

    async create(createUserBody)  {
        const createdUser = new this.userModel(createUserBody);
        return createdUser.save();
      }
}
