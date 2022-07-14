import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { BoardContext } from '../context';
import { getBoardById } from 'utils';

interface IProps {
    children: ReactNode;
    boardId: string;
}

const BoardProvider = ({ children, boardId }: IProps ) => {

    const router = useRouter();

    // Obtiene un tablero por su id
    const { data: board } = useQuery(
        ['board', boardId ],
        () => getBoardById( boardId ),
        {
            retry: false,
            onError: () => { router.push('/boards') }
        }
    );

    if ( !board ) {
        return null;
    }

    return (
        <BoardContext.Provider value={ board }>
            <Head>
                <title>{ board.name } | Thullo</title>
            </Head>

            { children }
        </BoardContext.Provider>
    )
}

export default BoardProvider;
