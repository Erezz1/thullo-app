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

// Agrega un tablero
interface IBoardCreate {
    name: string;
    cover: string;
}
export const createBoard = async ( board: IBoardCreate ): Promise<IBoard> => {
    const { data } = await axiosInstance.post<IBoard>(`/board/create`, board );
    return data;
}

// Actualiza un tablero
interface IBoardUpdate {
    name: string;
    description: string;
}
export const updateBoard = async ( board: IBoardUpdate, boardId: string ): Promise<IBoard> => {
    const { data } = await axiosInstance.put<IBoard>(`/board/update/${ boardId }`, board );
    return data;
}

// Eliminar un miembro de un tablero
export const deleteMemberFromBoard = async ( boardId: string, userId: string ): Promise<IBoard> => {
    const { data } = await axiosInstance.put<IBoard>(`/board/member/delete/${ boardId }`, { userId });
    return data;
}

// Agrega un miembro a un tablero
export const addMemberToBoard = async ( boardId: string, userId: string ): Promise<IBoard> => {
    const { data } = await axiosInstance.put<IBoard>(`/board/member/${ boardId }`, { userId });
    return data;
}
