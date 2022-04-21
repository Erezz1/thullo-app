import { PipeTransform, Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform<string, Promise<string>> {
    async transform( password: string ): Promise<string> {

        try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash( password, salt );

            return hash;

        } catch ( error ) {
            console.log( error );
            throw new ConflictException( 'Error al encriptar la contraseña' );
        }
    }
}