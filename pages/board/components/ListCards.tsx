import { Box, Text } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd-next';

import Card from './Card';
import { IList } from '../interfaces';

interface IProps {
    list: IList;
}

const ListCards = ({ list }: IProps ) => {

    const { cards, name, id } = list;

    return (
        <Box
            minW="2xs"
            w="2xs"
            key={ id }
        >
            <Text
                as="h2"
                fontWeight="500"
                mb="5"
            >{ name }</Text >

            <Droppable
                droppableId={ id }
                key={ id }
            >
            {
                ( provided:any ) => (
                    <Box
                        { ...provided.droppableProps }
                        ref={ provided.innerRef }
                        w="100%"
                        m="0"
                        minH="xl"
                    >
                        {
                            cards.map(( card, index ) => (
                                <Card
                                    card={ card }
                                    index={ index }
                                    key={ card.id }
                                />
                            ))
                        }

                        { provided.placeholder }
                    </Box>
                )
            }
            </Droppable>
        </Box>
    )
}

export default ListCards;
