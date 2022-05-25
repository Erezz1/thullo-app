import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    @Length(4, 30, { message: 'El nombre debe tener entre 4 y 30 caracteres' })
    readonly name: string;

    @IsEmail({ message: 'El email no es válido' })
    readonly email: string;

    @IsString({ message: 'La password debe ser una cadena de caracteres' })
    @Length(6, 30, { message: 'El password debe tener entre 6 y 30 caracteres' })
    readonly password: string;

    @IsString({ message: 'La imagen debe ser una cadena de caracteres' })
    readonly imageAvatar: string;
}
