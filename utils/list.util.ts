import axiosInstance from '@/client/axiosInstance';
import { IList } from 'types';

// Crear una lista
interface IListCreate {
    name: string;
    boardId: string;
}
export const createList = async ( list: IListCreate ): Promise<IList> => {
    const { data } = await axiosInstance.post<IList>('/list/create', list );
    return data;
}

// Cambiar nombre de una lista
interface IListUpdate {
    listId: string;
    name: string;
}
export const updateList = async ( { listId, name }: IListUpdate ): Promise<IList> => {
    const { data } = await axiosInstance.put<IList>(`/list/${ listId }`, { name });
    return data;
}

// Obtener las listas de un tablero
export const getListById = async ( listId: string ): Promise<IList> => {
    const { data } = await axiosInstance.get<IList>(`/list/${ listId }`);
    return data;
}

// Cambiar la posicion de las tarjetas en una lista
export const changeListPosition = async ( listId: string, cards: string[] ): Promise<IList> => {
    const { data } = await axiosInstance.put<IList>(`/list/cards/${ listId }`, { cards });
    return data;
}

// Eliminar una lista
interface IListDelete {
    listId: string;
    boardId: string;
}
export const deleteList = async ( { listId, boardId }: IListDelete ): Promise<void> => {
    await axiosInstance.patch(`/list/${ listId }`, { boardId });
}
