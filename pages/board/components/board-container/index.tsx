import { useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd-next';

import ListCards from './components/ListCards';
import CardDetails from '../card-details';
import AddList from './components/AddList';
import { IList } from 'types';
import { ListsContext } from 'contexts/context';
import { onDragEnd } from 'helpers';

const BoardContainer = () => {

    const listsData = useContext( ListsContext );
    const [ lists, setLists ] = useState<IList[]>([]);
    const query = useQueryClient();

    useEffect(() => {
        setLists( listsData );
    },[ listsData ]);

    return (
        <>
        <Box
            w="100%"
            p="5"
        >
            <Box
                minHeight="80vh"
                maxH="80vh"
                display="flex"
                gap="5"
                p="5"
                overflow="auto"
                bgColor="#F8F9FD"
                rounded="lg"
            >
                <DragDropContext
                    onDragEnd={( result: any ) => onDragEnd( result, lists, setLists, query )}
                >
                    {
                        lists.map(( list, index ) => (
                            <ListCards
                                list={ list }
                                key={ index }
                            />
                        ))
                    }

                    <AddList />
                </DragDropContext>
            </Box>
        </Box>
        <CardDetails />
        </>
    );
}

export default BoardContainer;
