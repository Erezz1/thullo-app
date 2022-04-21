import { IsString, IsEmail } from 'class-validator';

export class AuthUserDto {
    @IsEmail({ message: 'El email no es válido' })
    readonly email: string;

    @IsString({ message: 'La password debe ser una cadena de caracteres' })
    readonly password: string;
}
