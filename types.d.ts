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
    lists: string[];
}
