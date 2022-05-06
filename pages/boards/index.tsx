import type { NextPage } from 'next';
import {
    Box,
    Button,
    Icon,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';

import Header from '@/components/header';
import AddBoard from './components/AddBoard';
import BoardsList from './components/BoardsList';

const Boards: NextPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
        <Box
            height="100vh"
            width="100%"
            backgroundColor="#F8F9FD"
        >
            <Header />

            <Box
                w="95%"
                maxW="1200px"
                mx="auto"
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    my="10"
                >
                    <Text
                        fontWeight="bold"
                        fontSize="lg"
                    >
                        Tableros
                    </Text>

                    <Button
                        fontSize="sm"
                        py="1" px="5"
                        colorScheme="blue"
                        onClick={ onOpen }
                    >
                        <Icon as={ IoMdAdd } fontSize="lg" mr="1" />
                        Crear
                    </Button>
                </Box>

                <BoardsList />
            </Box>
        </Box>

        <AddBoard isOpen={ isOpen } onClose={ onClose } />
        </>
    )
}

export default Boards;
