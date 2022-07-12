import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';

import { createBoardPayload } from '../interfaces';
import { UserService } from '../../user/user.service';
import { Board, BoardDocument } from '../schema/board.schema';

@Injectable()
export class BoardService {

    constructor(
        @InjectModel( Board.name ) private boardModel: Model<BoardDocument>,
        private readonly userService: UserService,
    ) {}

    async findBoardById( id: string ): Promise<any> {
        const boardFound = await this.boardModel.findById( id );
        return boardFound;
    }

    async createBoard( userId: string, board: createBoardPayload ): Promise<any> {
        const boardCreated = new this.boardModel( board );
        await boardCreated.save();

        await this.userService.updateUser( userId, {
            $push: {
                boards: boardCreated._id,
            },
        });

        return boardCreated;
    }

    async updateNameBoard( boardId: string, newName: string, newDescription: string ): Promise<any> {
        const boardUpdated = await this.boardModel.findByIdAndUpdate( 
            boardId,
            {
                name: newName,
                description: newDescription,
            },
            { new: true }
        );
        return boardUpdated;
    }

    async updateBoard( boardId: string, payload: QueryOptions ): Promise<any> {
        const boardUpdated = await this.boardModel.findByIdAndUpdate( boardId, payload, { new: true });
        return boardUpdated;
    }

    async deleteBoard( id: string ): Promise<any> {
        await this.boardModel.findByIdAndDelete( id );
        return `Tablero con id: ${ id } eliminado`;
    }
}
