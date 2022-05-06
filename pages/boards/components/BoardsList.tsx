import { Grid } from '@chakra-ui/react';

import BoardItem from './BoardItem';

const BoardsList = () => {

    const boards = [
        1,2,3,4
    ];

    return (
        <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
            gap={7}
            pb="5"
        >
            {
                boards.map( board => (
                    <BoardItem key={ board } />
                ))
            }
        </Grid>
    )
}

export default BoardsList;
