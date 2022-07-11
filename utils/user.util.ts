import { IUser, IUserLogged } from 'types';
import axiosInstance from 'client/axiosInstance';

// Obtiene un usuario por su id
export const getUserById = async ( userId: string ): Promise<IUser> => {
    const { data } = await axiosInstance.get<IUser>(`/user/${ userId }`);
    return data;
}

// Obtiene todos los usuarios
export const getAllUsers = async ( usersId: string[] ): Promise<IUser[]> => {
    const res = await Promise.all(
        usersId.map( async ( userId ) => 
            await getUserById( userId )
        )
    )
    return res;
}

// Obtiene el usuario que esta logueado
export const getUserAuth = async (): Promise<IUserLogged> => {
    const user = await axiosInstance.get<IUserLogged>('/user');
    return user.data;
}
