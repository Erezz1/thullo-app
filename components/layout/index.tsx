import { ReactNode } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { Box } from '@chakra-ui/react';

import { UserProvider } from 'context/providers';
import Header from '../header';
import Loading from '../loading';

interface IProps {
    children: ReactNode;
    title: string;
}

const Layout = ({ children, title }: IProps ) => {

    // Se valida el estado de la sesion, si se esta verificando la sesion del usuario se muestra el loading
    const { status } = useSession();
    if ( status === 'loading' ) {
        return <Loading message="Validando sesión" />
    }

    return (
        <UserProvider>
            <Head>
                <title>{ title } | Thullo</title>
            </Head>

            <Box
                minH="100vh"
                width="100%"
            >
                <Header />
                { children }
            </Box>
        </UserProvider>
    )
}

export default Layout;
