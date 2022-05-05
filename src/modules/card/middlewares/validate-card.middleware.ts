
import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import mongoose from 'mongoose';

import { CardService } from '../card.service';

@Injectable()
export class ValidateCardMiddleware implements NestMiddleware {

    constructor( private readonly cardService: CardService ) {}

    async use( req: Request, res: Response, next: NextFunction ) {
        const cardId = req.params.cardId || req.body.cardId;

        if ( !cardId ) {
            throw new BadRequestException( 'El id de la tarjeta es obligatorio' );
        }

        const isMongoId = mongoose.isValidObjectId( cardId );
        if ( !isMongoId ) {
            throw new BadRequestException(`El id ${ cardId } no es un id de MongoDB`);
        }

        const cardFound = await this.cardService.getCardById( cardId );
        if ( !cardFound ) {
            throw new NotFoundException(`La tarjeta con id ${ cardId } no existe`);
        }

        next();
    }
}
