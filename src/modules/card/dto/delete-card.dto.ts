import { IsString, IsMongoId } from 'class-validator';

export class DeleteCardDto {
    @IsString({ message: 'El id de la lista debe ser un string' })
    @IsMongoId({ message: 'El id de la lista debe ser uno de mongoDB' })
    listId: string;
}
