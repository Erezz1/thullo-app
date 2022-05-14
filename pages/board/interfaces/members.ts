export interface Member {
    id: string;
    name: string;
    email: string;
    image: string;
    isAdmin: boolean;
}

export type Members = Member[];
