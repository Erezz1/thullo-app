import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateCardDto, DeleteCardDto, UpdateCardDto } from './dto';
import { CardService } from './card.service';
import { CreateCardPayload, CardResponse } from './interfaces';

@Controller('card')
export class CardController {

    constructor(
        private readonly cardService: CardService,
    ) {}

    @Get('/:cardId')
    async getCardById(@Param('cardId') cardId: string ): Promise<CardResponse> {

        const cardFound = await this.cardService.getCardById( cardId );

        const cardResponse: CardResponse = {
            id: cardFound._id,
            cover: cardFound.cover,
            title: cardFound.title,
            description: cardFound.description,
        }
        return cardResponse;
    }

    @Post('/create')
    async createCard(@Body() newCard: CreateCardDto ): Promise<CardResponse> {

        const { listId, cover, description, title } = newCard;

        const createCardPayload: CreateCardPayload = {
            title,
            description,
            cover,
        }
        const cardCreated = await this.cardService.createCard( listId, createCardPayload );

        const cardResponse: CardResponse = {
            cover: cardCreated.cover,
            description: cardCreated.description,
            title: cardCreated.title,
            id: cardCreated._id,
        }
        return cardResponse;
    }

    @Put('/:cardId')
    async updateCard(
        @Param('cardId') cardId: string,
        @Body() newCard: UpdateCardDto,
    ): Promise<CardResponse> {
        const { cover, description, title } = newCard;

        const createCardPayload: CreateCardPayload = {
            title,
            description,
            cover,
        }
        const cardCreated = await this.cardService.updateCard( cardId, createCardPayload );

        const cardResponse: CardResponse = {
            cover: cardCreated.cover,
            description: cardCreated.description,
            title: cardCreated.title,
            id: cardCreated._id,
        }
        return cardResponse;
    }

    @Put('/delete/:cardId')
    async deleteCard(
        @Param('cardId') cardId: string,
        @Body() card: DeleteCardDto
    ): Promise<{ message: string }> {

        const { listId } = card;
        const message = await this.cardService.deleteCard( listId, cardId );

        return { message };
    }
}
