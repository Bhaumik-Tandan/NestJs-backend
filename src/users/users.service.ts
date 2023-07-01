import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import UserSchema from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private userModel: Model<"User">) {}

    async create(createCatDto)  {
        const createdCat = new this.userModel(createCatDto);
        return createdCat.save();
      }
}
