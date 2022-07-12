import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';

import BoardItem from './BoardItem';
import { IBoard, IUserLogged } from 'types';
import { getAllBoards } from 'utils';

const BoardsList = () => {

    // Crea un estado de los tableros y obtenemos el contexto de usuario
    const [ boards, setBoards ] = useState<IBoard[]>([]);
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<IUserLogged>('user');

    // Obtiene todos los tableros del usuario
    const { refetch } = useQuery(['boards'], () => getAllBoards( user?.boards || [] ), {
        onSuccess: data => setBoards( data ),
        retry: false,
        refetchOnWindowFocus: false,
    });

    // Hace un refetch del tablero al cambiar el estado del usuario
    useEffect(() => {
        refetch();
    }, [ user ]);

    return (
        <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
            gap={7}
            pb="5"
        >
            {
                boards.map( board => (
                    <BoardItem
                        key={ board.id }
                        board={ board }
                    />
                ))
            }
        </Grid>
    )
}

export default BoardsList;
