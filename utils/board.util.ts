import axiosInstance from '@/client/axiosInstance';
import { IBoard } from 'types';

// Obtiene un tablero por su id
export const getBoardById = async ( id: string ): Promise<IBoard> => {
    const response = await axiosInstance.get<IBoard>(`/board/find/${ id }`);
    return response.data;
}

// Obtiene todos los tableros
export const getAllBoards = async ( ids: string[] ): Promise<IBoard[]> => {
    const response = await Promise.all(
        ids.map( async ( id ) => await getBoardById( id ) )
    )
    return response;
}

interface IBoardCreate {
    name: string;
    cover: string;
}
export const createBoard = async ( board: IBoardCreate ): Promise<IBoard> => {
    const { data } = await axiosInstance.post<IBoard>(`/board/create`, board );
    return data;
}
