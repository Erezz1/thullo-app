import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

import { UserService } from '../../user/user.service';

@Injectable()
export class ValidatePasswordMiddleware implements NestMiddleware {

    constructor( private readonly userService: UserService ) {}

    async use( req: Request, res: Response, next: NextFunction ) {

        const { password, email } = req.body;
        const user = await this.userService.getUserByEmail( email );

        const passwordIsCorrect = await bcrypt.compare( password, user.password );

        if ( !passwordIsCorrect ) {
            throw new UnauthorizedException('La contraseña no es correcta');
        }

        next();
    }
}
