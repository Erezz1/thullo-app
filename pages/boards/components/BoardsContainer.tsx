import { useContext } from 'react';
import {
    Box,
    Button,
    Icon,
    Text,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';

import BoardsList from './BoardsList';
import { UserContext } from 'contexts/context';

interface IProps {
    onOpen: () => void;
}

const BoardsContainer = ({ onOpen }: IProps ) => {

    const user = useContext( UserContext );

    if ( !user ) {
        return (
            <Text
                fontWeight="bold"
                fontSize="lg"
                my="10"
                textAlign="center"
                color="gray.500"
            >
                Inicia sesión para poder crear un tablero
            </Text>
        )
    }

    return (
        <>
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
        </>
    )
}

export default BoardsContainer;
