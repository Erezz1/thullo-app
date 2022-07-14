import { ReactNode, useContext } from 'react';
import { useQueries } from 'react-query';

import { BoardContext, ListsContext } from '../context';
import { getListById } from 'utils';
import { IList } from 'types';

interface IProps {
    children: ReactNode;
}

const ListsProvider = ({ children }: IProps ) => {

    const board = useContext( BoardContext );

    const data = useQueries(
        board.lists?.map( list => ({
            queryKey: [ 'list', list ],
            queryFn: () => getListById( list )
        })),
    )

    const lists: IList[] = data
        .filter(({ isError }) => !isError )
        .filter(({ data }) => data !== undefined )
        .map(({ data }) => data ) as IList[];

    return (
        <ListsContext.Provider value={ lists }>
            { children }
        </ListsContext.Provider>
    )
}

export default ListsProvider;
