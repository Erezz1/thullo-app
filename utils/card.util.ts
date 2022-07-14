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
