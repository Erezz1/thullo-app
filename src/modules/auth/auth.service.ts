import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {

    constructor( private jwtService: JwtService ) {}

    async generateJwt( userId: string ): Promise<string> {
        const payload: JwtPayload = { userId };
        const token = await this.jwtService.sign( payload );

        return token;
    }
}
