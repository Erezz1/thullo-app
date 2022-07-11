import { Body, Controller, Get, Param, Post, Request, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { HashPasswordPipe } from './pipes';
import { Public } from '../auth/decorators/public.decorator';
import { ILogin, JwtPayload } from '../auth/interfaces';
import { UserResponse, UserFound } from './interfaces';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    @Get()
    async getUser(@Request() req: any ): Promise<UserResponse> {
        const { _id: userId } = req.user;
        const foundUser = await this.userService.getUserById( userId );

        const userResponse: UserResponse = {
            email: foundUser.email,
            id: foundUser._id,
            name: foundUser.name,
            boards: foundUser.boards,
            imageAvatar: foundUser.imageAvatar,
        }

        return userResponse;
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: string ): Promise<UserFound> {
        const foundUser = await this.userService.getUserById( userId );

        if ( !foundUser ) throw new NotFoundException('Usuario no encontrado');

        const userResponse: UserFound = {
            name: foundUser.name,
            id: foundUser._id,
            imageAvatar: foundUser.imageAvatar,
        }

        return userResponse;
    }

    @Public()
    @Post('/create')
    async createUser(
        @Body() user: CreateUserDto,
        @Body('password', HashPasswordPipe ) password: string,
    ): Promise<ILogin> {

        const userPayload = {
            ...user,
            password,
        }
        const userRegister = await this.userService.createUser( userPayload );

        const tokenPayload: JwtPayload = { userId: userRegister._id };
        const token = await this.jwtService.sign( tokenPayload );

        const userResponse: UserResponse = {
            email: userRegister.email,
            id: userRegister._id,
            name: userRegister.name,
            boards: userRegister.boards,
            imageAvatar: userRegister.imageAvatar,
        }

        return {
            token,
            user: userResponse,
        };
    }
}
