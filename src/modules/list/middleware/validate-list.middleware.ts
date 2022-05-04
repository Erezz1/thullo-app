import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import mongoose from 'mongoose';

import { ListService } from '../list.service';

@Injectable()
export class ValidateListMiddleware implements NestMiddleware {

    constructor( private readonly listService: ListService ) {}

    async use( req: Request, res: Response, next: NextFunction ) {
        const listId = req.params.listId || req.body.listId;

        if ( !listId ) {
            throw new BadRequestException( 'El id de la lista es obligatorio' );
        }

        const isMongoId = mongoose.isValidObjectId( listId );
        if ( !isMongoId ) {
            throw new BadRequestException(`El id ${ listId } no es un id de MongoDB`);
        }

        const listFound = await this.listService.getListById( listId );
        if ( !listFound ) {
            throw new NotFoundException(`La lista con id ${ listId } no existe`);
        }

        next();
    }
}
