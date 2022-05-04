import { IsString } from 'class-validator';

export class UpdateListDto {
    @IsString({ message: 'El nombre es obligatorio' })
    name: string;
}
