import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import mongoose from 'mongoose';

import { UserService } from '../user.service';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {

    constructor( private readonly userService: UserService ) {}

    async use( req: Request, res: Response, next: NextFunction ) {
        const userId = req.params.userId || req.body.userId;

        if ( !userId ) {
            throw new BadRequestException( 'El id del usuario es obligatorio' );
        }

        const isMongoId = mongoose.isValidObjectId( userId );
        if ( !isMongoId ) {
            throw new BadRequestException(`El id ${ userId } no es un id de MongoDB`);
        }

        const userFound = await this.userService.getUserById( userId );
        if ( !userFound ) {
            throw new NotFoundException(`El usuario con id ${ userId } no existe`);
        }

        next();
    }
}
