import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthUserDto } from './dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces';
import { JWT_SECRET } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor( private readonly usersService: UserService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate( payload: JwtPayload ): Promise<AuthUserDto> {

        const user = await this.usersService.getUserById( payload.userId );

        if ( !user ) {
            throw new UnauthorizedException('Token no válido');
        }

        return user;
    }
}
