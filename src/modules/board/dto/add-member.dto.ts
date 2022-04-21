import { IsMongoId, IsString } from 'class-validator';

export class AddMemberDto {
    @IsString({ message: 'El id del usuario debe ser un string' })
    @IsMongoId({ message: 'El id del no es uno de mongoDB' })
    userId: string;
}
