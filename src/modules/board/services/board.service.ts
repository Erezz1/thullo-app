import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { createBoardPayload } from '../interfaces';
import { Board, BoardDocument } from '../schema/board.schema';

@Injectable()
export class BoardService {

    constructor(
        @InjectModel( Board.name ) private userModel: Model<BoardDocument>,
    ) {}

    async findBoardById( id: string ): Promise<any> {
        const boardFound = await this.userModel.findById( id );
        return boardFound;
    }

    async createBoard( board: createBoardPayload ): Promise<any> {
        const boardCreated = new this.userModel( board );
        await boardCreated.save();

        return boardCreated;
    }

    async updateNameBoard( boardId: string, newName: string ): Promise<any> {
        const boardUpdated = await this.userModel.findByIdAndUpdate( boardId, { name: newName }, { new: true });
        return boardUpdated;
    }

    async updateBoard( boardId: string, payload: any ): Promise<any> {
        const boardUpdated = await this.userModel.findByIdAndUpdate( boardId, payload, { new: true });
        return boardUpdated;
    }

    async deleteBoard( id: string ): Promise<string> {
        await this.userModel.findByIdAndDelete( id );
        return `Tablero con id: ${ id } eliminado`;
    }
}
