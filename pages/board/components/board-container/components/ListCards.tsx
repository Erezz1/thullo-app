import { Box } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd-next';

import Card from './Card';
import ListSettings from './ListSettings';
import AddCard from './AddCard';
import { IList } from 'types';

interface IProps {
    list: IList;
}

const ListCards = ({ list }: IProps ) => {

    const { cards, id } = list;

    return (
        <Box
            minW="2xs"
            w="2xs"
            key={ id }
        >
            <ListSettings list={ list } />

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

                        <AddCard listId={ id } />
                    </Box>
                )
            }
            </Droppable>
        </Box>
    )
}

export default ListCards;
