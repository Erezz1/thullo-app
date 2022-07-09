import type { NextPage } from 'next';
import {
    Box,
    Button,
    Icon,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import jwt from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { IoMdAdd } from 'react-icons/io';

import Layout from '@/components/layout';
import AddBoard from './components/AddBoard';
import BoardsList from './components/BoardsList';

const Boards: NextPage = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Obtenemos la sesion del usuario y si no esta autenticado redirigimos a la pagina de login
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated: () => {
            router.push('/login');
        }
    });
    console.log( session?.accessToken );

    return (
        <>
        <Layout title="Tableros">
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
        </Layout>

        <AddBoard isOpen={ isOpen } onClose={ onClose } />
        </>
    )
}

export default Boards;
