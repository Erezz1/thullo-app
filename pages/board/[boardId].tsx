import {
    Box
} from '@chakra-ui/react';

import Header from '@/components/header';
import MembersList from './components/MembersList';
import BoardDetails from './components/BoardDetails';
import BoardContainer from './components/BoardContainer';

const Board = () => {
    return (
        <Box
            height="100vh"
            width="100%"
        >
            <Header />

            <Box
                p="5"
                display={["none", "flex"]}
                justifyContent="space-between"
                alignItems="center"
            >
                <MembersList />
                <BoardDetails />
            </Box>

            <BoardContainer />
        </Box>
    )
}

export default Board;
