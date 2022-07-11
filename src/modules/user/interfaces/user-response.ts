export interface UserResponse {
    id: string;
    name: string;
    email: string;
    boards: string[];
    imageAvatar: string;
}

export interface UserFound {
    name: string;
    id: string;
    imageAvatar: string;
}
