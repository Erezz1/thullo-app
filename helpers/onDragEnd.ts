import { Dispatch, SetStateAction } from 'react';
import { QueryClient } from 'react-query';

import { IList } from 'types';
import { changeListPosition } from 'utils';

export const onDragEnd = (
    result:any,
    lists: IList[],
    setLists: Dispatch<SetStateAction<IList[]>>,
    queryClient: QueryClient
) => {
    if ( !result.destination ) return;
    const { source, destination } = result;

    // Valida si se mueve una tarjeta de una lista a otra o si solo se mueve el orden de las tarjetas de una lista
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
        setLists(( prev: IList[] ) => prev.map(
            ( list: IList ) => {
                if ( list.id === source.droppableId ) {
                    list.cards = sourceItems;
                    const cards = list.cards.map( card => card.id );
                    changeListPosition( list.id, cards )
                        .then( data => queryClient.invalidateQueries([ "list", list.id ]) )
                        .catch( console.log );
                } else if ( list.id === destination.droppableId ) {
                    list.cards = destItems;
                    const cards = list.cards.map( card => card.id );
                    changeListPosition( list.id, cards )
                        .then( data => queryClient.invalidateQueries([ "list", list.id ]) )
                        .catch( console.log );
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
        setLists(( prev: IList[] ) => prev.map(
            ( list: IList ) => {
                if ( list.id === destination.droppableId ) {
                    list.cards = copiedItems;
                    const cards = list.cards.map( card => card.id );
                    changeListPosition( list.id, cards )
                        .then( data => queryClient.invalidateQueries([ "list", list.id ]) )
                        .catch( console.log );
                }
                return list;
            }
        ));
    }
};
