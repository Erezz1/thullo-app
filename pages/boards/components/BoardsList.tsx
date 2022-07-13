import { Grid, Text } from '@chakra-ui/react';

import BoardItem from './BoardItem';
import { UserContext } from 'contexts/context';
import { useContext } from 'react';

const BoardsList = () => {

    // Obtiene el estado del usuario
    const user = useContext( UserContext );

    // Valida si el usuario tiene por lo menos un tablero
    if ( !user?.boards ) {
        return (
            <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                color="gray.500"
            >
                ¡Crea un tablero!
            </Text>
        );
    }

    return (
        <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
            gap={7}
            pb="5"
        >
            {
                user?.boards.map( boardId => (
                    <BoardItem
                        key={ boardId }
                        boardId={ boardId }
                    />
                ))
            }
        </Grid>
    )
}

export default BoardsList;
