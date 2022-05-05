import { IsString } from 'class-validator';

export class UpdateCardDto {
    @IsString({ message: 'El nombre es obligatorio' })
    title: string;

    @IsString({ message: 'La descripcion es obligatoria' })
    description: string;

    @IsString({ message: 'La imagen debe ser un string' })
    cover: string;
}
