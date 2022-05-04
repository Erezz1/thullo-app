import { IsMongoId, IsString } from 'class-validator';

export class CreateCardDto {
    @IsString({ message: 'El nombre es obligatorio' })
    title: string;

    @IsString({ message: 'La descripcion es obligatoria' })
    description: string;

    @IsString({ message: 'La imagen debe ser un string' })
    cover: string;

    @IsMongoId({ message: 'El id de la lista debe ser un id de MongoDB' })
    listId: string;
}
