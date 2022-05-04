import { Model, QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel( User.name ) private userModel: Model<UserDocument>,
    ) {}

    async getUserById( id: string ): Promise<any> {
        const user = await this.userModel.findById( id );
        return user;
    }

    async createUser( user: CreateUserDto ): Promise<any> {
        const createdUser = new this.userModel( user );
        await createdUser.save();

        return createdUser;
    }

    async getUserByEmail( email: string ): Promise<any> {
        return await this.userModel.findOne({ email });
    }

    async updateUser( id: string, payload: QueryOptions ): Promise<any> {
        const userUpdated = await this.userModel.findByIdAndUpdate( id, payload, { new: true });
        return userUpdated;
    }
}
