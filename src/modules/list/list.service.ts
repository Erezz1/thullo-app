import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BoardService } from '../board/services';
import { List, ListDocument } from './schema/list.schema';

@Injectable()
export class ListService {

    constructor(
        @InjectModel ( List.name ) private listModel: Model<ListDocument>,
        private readonly boardService: BoardService,
    ) {}

    async getListById( listId: string ): Promise<any> {
        const listFound = await this.listModel.findById( listId ).populate('cards');
        return listFound;
    }

    async createList( listName: string, boardId: string ): Promise<any> {
        const listCreated = new this.listModel({ name: listName });
        await listCreated.save();

        await this.boardService.updateBoard( boardId, {
            $push: {
                lists: listCreated._id,
            },
        });

        return listCreated;
    }

    async updateList( listId: string, newName: string ): Promise<any> {
        const listUpdated = await this.listModel.findByIdAndUpdate( listId, { name: newName }, { new: true });
        return listUpdated;
    }

    async addCard( listId: string, newCard: string ): Promise<any> {
        const listFound = await this.listModel.findByIdAndUpdate( listId, {
            $push: {
                cards: newCard,
            },
        }, { new: true });

        return listFound;
    }

    async removeCard( listId: string, cardId: string ): Promise<any> {
        const listFound = await this.listModel.findByIdAndUpdate( listId, {
            $pull: {
                cards: cardId,
            },
        }, { new: true });

        return listFound;
    }

    async changeCardsPosition( listId: string, cards: string[] ): Promise<any> {
        const listFound = await this.listModel.findByIdAndUpdate( listId, {
            $set: {
                cards,
            },
        }, { new: true }).populate('cards');

        return listFound;
    }

    async deleteList( listId: string, boardId: string ): Promise<string> {
        const listDeleted = await this.listModel.findByIdAndDelete( listId );

        await this.boardService.updateBoard( boardId, {
            $pull: {
                lists: listDeleted._id,
            },
        });

        return `Borrando la lista con id ${ listId }`;
    }
}
