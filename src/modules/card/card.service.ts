import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Card, CardDocument } from './schema/card.schema';
import { CreateCardPayload } from './interfaces';
import { ListService } from '../list/list.service';

@Injectable()
export class CardService {

    constructor(
        @InjectModel( Card.name ) private readonly cardModel: Model<CardDocument>,
        private readonly listService: ListService,
    ) {}

    async getCardById( cardId: string ): Promise<any> {
        const cardFound = await this.cardModel.findById( cardId );
        return cardFound;
    }

    async createCard( listId: string, newCard: CreateCardPayload ): Promise<any> {
        const cardCreated = new this.cardModel( newCard );
        await cardCreated.save();

        await this.listService.addCard( listId, cardCreated._id );

        return cardCreated;
    }

    async updateCard( cardId: string, newCard: CreateCardPayload ): Promise<any> {
        const cardUpdated = await this.cardModel.findByIdAndUpdate( cardId, newCard, { new: true } );
        return cardUpdated;
    }

    async deleteCard( listId: string, cardId: string ): Promise<any> {
        await this.cardModel.findByIdAndDelete( cardId );
        await this.listService.removeCard( listId, cardId );

        return 'Tarjeta eliminada exitosamente!';
    }
}