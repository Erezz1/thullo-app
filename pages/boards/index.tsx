import type { NextPage } from 'next';
import {
    Box,
    useDisclosure
} from '@chakra-ui/react';

import Layout from '@/components/layout';
import AddBoard from './components/AddBoard';
import BoardsContainer from './components/BoardsContainer';

const Boards: NextPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Layout title="Tableros">
            <Box
                w="95%"
                maxW="1200px"
                mx="auto"
            >
                <BoardsContainer onOpen={ onOpen } />
            </Box>

            <AddBoard isOpen={ isOpen } onClose={ onClose } />
        </Layout>
    )
}

export default Boards;
