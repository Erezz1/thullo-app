import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    Box,
    useToast
} from '@chakra-ui/react';

import Header from '@/components/header';
import BoardContainer from './components/board-container';
import { useWindowSize } from 'hooks';

const MembersList = dynamic( () => import(/* webpackChunkName: "members-list" */ './components/members-list') );
const BoardDetails = dynamic( () => import(/* webpackChunkName: "board-details" */ './components/board-details') );

const Board = () => {

    // Obtenemos la funcion para mostrar el componente toast y el tamaño de la ventana
    const toast = useToast();
    const { windowSize } = useWindowSize();

    // Valida si el usuario esta en una resolución de escritorio
    useEffect(() => {
        if ( windowSize.width < 992 && windowSize.width > 200 ) {
            toast({
                title: '¡Atención!',
                description: 'Para una mejor experiencia, utiliza una laptop o una computadora de escritorio.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [ windowSize, toast ]);

    return (
        <Box
            height="100vh"
            width="100%"
        >
            <Header />

            <Box
                p="5"
                pb="0"
                display={["none", "flex"]}
                justifyContent="space-between"
                alignItems="center"
            >
                <MembersList />
                <BoardDetails  />
            </Box>

            <BoardContainer />
        </Box>
    )
}

export default Board;
