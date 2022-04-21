import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    name: string;

    @IsNotEmpty({ message: 'La imagen debe ser obligatoria' })
    @IsString({ message: 'El cover debe ser una cadena de caracteres' })
    cover: string;
}
