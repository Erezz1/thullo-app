export interface ICard {
    id: string;
    title: string;
    description: string;
    cover: string;
}

export interface IList {
    id: string;
    name: string;
    cards: ICard[];
}

export type ILists = IList[];
