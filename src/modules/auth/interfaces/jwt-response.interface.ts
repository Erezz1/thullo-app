import { UserResponse } from 'src/modules/user/interfaces';

export interface JwtResponse {
    token: string;
}

export interface ILogin {
    token: string;
    user: UserResponse;
}
