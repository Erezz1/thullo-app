import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Image,
    Text
} from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd-next';

import { ICard } from 'types';
import { BoardContext } from 'contexts/context';

interface IProps {
    card: ICard;
    listId: string;
    index: number;
}

const Card = ({ card, index, listId }: IProps ) => {

    // Obtiene el contexto del tablero y los datos de la tarjeta
    const { cover, id, title } = card;
    const board = useContext( BoardContext );

    // Instancia del router
    const router = useRouter();

    // Funcion para abrir el modal al hacer click en la tarjeta
    const handleOpenCard = () => {
        router.push(`/board/${ board.id }?cardId=${ id }&listId=${ listId }`);
    }

    return (
        <Draggable
            key={ id }
            draggableId={ id }
            index={ index }
        >
        {
            ( provided:any, snapshot:any ) => (
                <Box
                    ref={ provided.innerRef }
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    w="100%"
                    p="3"
                    rounded="lg"
                    boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
                    cursor="grab"
                    mb="5"
                    bgColor={ snapshot.isDragging ? 'blue.50' : '#FFF' }
                    style={{ ...provided.draggableProps.style }}
                    onClick={ handleOpenCard }
                >
                    {
                        cover && (
                            <Image
                                src={ cover }
                                alt={ title }
                                w="100%"
                                h="32"
                                objectFit="cover"
                                mb="3"
                                rounded="lg"
                            />
                        )
                    }
                    <Text fontWeight="500">{ title }</Text>
                </Box>
            )
        }
        </Draggable>
    )
}

export default Card;
