import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {

    findAll() {
        return `Buscando todas las tarjetas`;
    }
}