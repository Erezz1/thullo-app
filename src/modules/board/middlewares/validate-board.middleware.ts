import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import mongoose from 'mongoose';

import { BoardService } from '../services';

@Injectable()
export class ValidateBoardMiddleware implements NestMiddleware {

    constructor( private readonly boardService: BoardService ) {}

    async use( req: Request, res: Response, next: NextFunction ) {
        const boardId = req.params.boardId || req.body.boardId;

        if ( !boardId ) {
            throw new BadRequestException( 'El id del tablero es obligatorio' );
        }

        const isMongoId = mongoose.isValidObjectId( boardId );
        if ( !isMongoId ) {
            throw new BadRequestException(`El id ${ boardId } no es un id de MongoDB`);
        }

        const boardFound = await this.boardService.findBoardById( boardId );
        if ( !boardFound ) {
            throw new NotFoundException(`El tablero con id ${ boardId } no existe`);
        }

        next();
    }
}
