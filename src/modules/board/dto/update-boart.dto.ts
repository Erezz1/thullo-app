import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    name: string;
}
