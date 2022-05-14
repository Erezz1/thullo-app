import { Box, Image, Text } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd-next';

import { ICard } from '../../../interfaces';

interface IProps {
    card: ICard;
    index: number;
}

const Card = ({ card, index }: IProps ) => {

    const { cover, id, title } = card;

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
                    onClick={() => console.log( card )}
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
