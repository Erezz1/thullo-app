import { IsString, IsMongoId } from 'class-validator';

export class DeleteListDto {
    @IsString({ message: 'El id del tablero debe ser un string' })
    @IsMongoId({ message: 'El id del tablero debe ser uno de mongoDB' })
    boardId: string;
}
