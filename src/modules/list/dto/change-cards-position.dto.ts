import { IsMongoId } from 'class-validator';

export class ChangeCardsPositionDto {
    @IsMongoId({
        message: 'Los ids de las tarjetas deben ser de mongoDB',
        each: true,
    })
    cards: string[];
}
