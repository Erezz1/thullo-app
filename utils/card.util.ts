import axiosInstance from '@/client/axiosInstance';
import { ICard } from 'types';

// Crear una tarjeta
interface ICardCreate {
    listId: string;
    title: string;
    description: string;
    cover: string;
}
export const createCard = async ( newCard: ICardCreate ): Promise<ICard> => {
    const { data } = await axiosInstance.post<ICard>('/card/create', newCard );
    return data;
}

// Obtener una tarjeta
export const getCardById = async ( cardId: string ): Promise<ICard> => {
    const { data } = await axiosInstance.get<ICard>(`/card/${ cardId }` );
    return data;
}

// Actualizar una tarjeta
interface ICardUpdate {
    title: string;
    description: string;
    cover: string;
    id: string;
}
export const updateCard = async ( { id: cardId, ...card }: ICardUpdate ): Promise<ICard> => {
    const { data } = await axiosInstance.put<ICard>(`/card/${ cardId }`, card );
    return data;
}

// Eliminar una tarjeta
export const deleteCard = async ( cardId: string, listId: string ): Promise<void> => {
    await axiosInstance.put(`/card/delete/${ cardId }`, { listId });
}
