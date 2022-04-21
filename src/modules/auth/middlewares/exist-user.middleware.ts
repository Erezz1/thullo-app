import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserService } from '../../user/user.service';

@Injectable()
export class ExistUserMiddleware implements NestMiddleware {

    constructor( private readonly userService: UserService ) {}

    async use( req: Request, res: Response, next: NextFunction ) {

        const { email } = req.body;
        const user = await this.userService.getUserByEmail( email );

        if ( !user ) {
            throw new NotFoundException('El usuario no existe en la base de datos');
        }

        next();
    }
}
