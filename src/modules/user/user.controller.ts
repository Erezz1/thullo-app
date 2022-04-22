import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { HashPasswordPipe } from './pipes';
import { Public } from '../auth/decorators/public.decorator';
import { JwtPayload, JwtResponse } from '../auth/interfaces';
import { UserResponse } from './interfaces';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    @Get()
    async getUser(@Request() req ): Promise<UserResponse> {
        const { _id: userId } = req.user;
        const foundUser = await this.userService.getUserById( userId );

        const userResponse: UserResponse = {
            email: foundUser.email,
            id: foundUser._id,
            name: foundUser.name,
            boards: foundUser.boards,
        }

        return userResponse;
    }

    @Public()
    @Post('/create')
    async createUser(
        @Body() user: CreateUserDto,
        @Body('password', HashPasswordPipe ) password: string,
    ): Promise<JwtResponse> {

        const userPayload = {
            ...user,
            password,
        }
        const userRegister = await this.userService.createUser( userPayload );

        const tokenPayload: JwtPayload = { userId: userRegister._id };
        const token = await this.jwtService.sign( tokenPayload );

        return { token };
    }
}
