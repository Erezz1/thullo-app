import { Controller, Post, Body, Get, Request } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto';
import { Public } from './decorators/public.decorator';
import { JwtResponse } from './interfaces';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Public()
    @Post('login')
    async login(@Body() user: AuthUserDto ): Promise<JwtResponse> {
        const { email } = user;

        const foundUser = await this.userService.getUserByEmail( email );
        const token = await this.authService.generateJwt( foundUser._id );

        return { token };
    }

    @Get('revalidate-token')
    async revalidateToken(
        @Request() req
    ): Promise<JwtResponse> {
        const { _id } = req.user;

        const token = await this.authService.generateJwt( _id );
        return { token };
    }
}
