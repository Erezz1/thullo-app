export interface IUserLogged {
    boards: string[];
    email: string;
    id: string;
    imageAvatar: string;
    name: string;
}

export interface IUser {
    name: string;
    id: string;
    imageAvatar: string;
}

export interface IBoard {
    id: string;
    name: string;
    cover: string;
    members: string[];
    admins: string[];
    lists: string[];
    description: string;
}

export interface IList {
    id: string;
    name: string;
    cards: ICard[];
}

export interface ICard {
    id: string;
    title: string;
    description: string;
    cover: string;
}