import { CardResponse } from 'src/modules/card/interfaces';

export interface ListResponse {
    id: string;
    name: string;
    cards: CardResponse[];
}
