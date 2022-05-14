import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd-next';
import { v4 as uuid } from 'uuid';

import ListCards from './components/ListCards';
import CardDetails from '../card-details';
import AddList from './components/AddList';
import { IList, ILists } from '../../interfaces';

const data: ILists = [
    {
        id: uuid(),
        name: 'Blocklog 🤔',
        cards: [
            {
                id: uuid(),
                title: 'First task',
                description: 'This is the first task',
                cover: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
            },
            {
                id: uuid(),
                title: 'Last',
                description: 'This is the first task',
                cover: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
            },
            {
                id: uuid(),
                title: 'Second task',
                description: '',
                cover: ''
            },
            {
                id: uuid(),
                title: 'Third task',
                description: '',
                cover: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
            },
        ]
    },
    {
        id: uuid(),
        name: 'In Progress📚',
        cards: [
            {
                id: uuid(),
                title: 'Fourth task',
                description: '',
                cover: ''
            },
            {
                id: uuid(),
                title: 'Fifth task',
                description: '',
                cover: ''
            }
        ]
    },
    {
        id: uuid(),
        name: 'Completed 🙌🏽',
        cards: []
    },
];

const onDragEnd = ( result:any, lists: ILists, setLists: Dispatch<SetStateAction<ILists>> ) => {
    if ( !result.destination ) return;
    const { source, destination } = result;

    // Valida si se mueve una tarjeta de una lista a otra
    if ( source.droppableId !== destination.droppableId ) {

        // Obtencion de las listas involucradas
        const sourceList = lists.find(( list: IList ) => list.id === source.droppableId ) as IList;
        const destList = lists.find(( list: IList ) => list.id === destination.droppableId ) as IList;

        // Obtencion de las tarjetas
        const sourceItems = [ ...sourceList.cards ];
        const destItems = [...destList.cards ];

        // Movimiento de las tarjetas
        const removed = sourceItems.splice( source.index, 1 );
        destItems.splice( destination.index, 0, removed[0] );

        // Actualizacion de las listas
        setLists(( prev: ILists ) => prev.map(
            ( list: IList ) => {
                if ( list.id === source.droppableId ) {
                    list.cards = sourceItems;
                } else if ( list.id === destination.droppableId ) {
                    list.cards = destItems;
                }
                return list;
            }
        ));

    } else {
        // Obtencion de las lista involucrada
        const list = lists.find(( list: any ) => list.id === destination.droppableId ) as IList;
        const copiedItems = [ ...list.cards ];

        // Movimiento de las tarjetas
        const removed = copiedItems.splice( source.index, 1 );
        copiedItems.splice( destination.index, 0, removed[0] );

        // Actualizacion de las listas
        setLists(( prev: ILists ) => prev.map(
            ( list: IList ) => {
                if ( list.id === destination.droppableId ) {
                    list.cards = copiedItems;
                }
                return list;
            }
        ));
    }
};

const BoardContainer = () => {

    const [ lists, setLists ] = useState<ILists>([]);

    useEffect(() => {
        setLists( data );
    },[]);

    return (
        <>
        <CardDetails />
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
                    onDragEnd={( result: any ) => onDragEnd( result, lists, setLists )}
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
        </>
    );
}

export default BoardContainer;
