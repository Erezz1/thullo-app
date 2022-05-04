import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCardDto } from './dto';

@Controller('card')
export class CardController {

    @Post('/create')
    async createCard(@Body() newCard: CreateCardDto ): Promise<string> {
        return 'This action returns all cats';
    }
}
