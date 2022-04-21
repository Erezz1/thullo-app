import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import mongoose from 'mongoose';

import { BoardService } from '../services';

@Injectable()
export class ValidateBoardMiddleware implements NestMiddleware {

    constructor( private readonly boardService: BoardService ) {}

    async use( req: Request, res, next: NextFunction ) {
        const { boardId } = req.params;

        const isMongoId = mongoose.isValidObjectId( boardId );
        if ( !isMongoId ) {
            throw new BadRequestException(`El id ${ boardId } no es valido`);
        }

        const boardFound = await this.boardService.findBoardById( boardId );
        if ( !boardFound ) {
            throw new NotFoundException(`El tablero con id ${ boardId } no existe`);
        }

        next();
    }
}
