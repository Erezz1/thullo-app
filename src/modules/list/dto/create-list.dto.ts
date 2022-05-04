import { IsMongoId, IsString } from 'class-validator';

export class CreateListDto {
    @IsString({ message: 'El nombre es obligatorio' })
    name: string;

    @IsString({ message: 'El id del tablero debe ser un string' })
    @IsMongoId({ message: 'El id del tablero debe ser uno de mongoDB' })
    boardId: string;
}
