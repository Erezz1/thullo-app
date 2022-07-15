import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { Box, useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Loading from '@/components/loading';

const Login: NextPage = () => {

    // Estado para verificar si el usuario se esta registrando o logueando
    const [ isLogging, setIsLogging ] = useState<boolean>( true );
    const toast = useToast();

    const { push, query } = useRouter();

    // Valida si ha habido algun error al loguearse
    useEffect(() => {
        if ( Object.keys( query ).length > 0 ) {
            toast({
                title: `Error #${ query.error }`,
                description: query.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [ query ])

    // Valida si el usuario esta logueado, en caso de ser asi, lo redirige a la pagina de 'boards'
    const { status } = useSession();
    if ( status === 'authenticated' ) {
        push('/boards');
    }

    // Se valida el estado de la sesion, si se esta verificando la sesion del usuario se muestra el loading
    if ( status === 'loading' ) {
        return <Loading message="Validando sesión" />
    }

    return (
        <>
        <Head>
            <title>
                { isLogging ? 'Inicia Sesión' : 'Registrate' } | Thullo
            </title>
            <link rel="icon" href="/images/Logo-small.svg" />
        </Head>

        <Box
            minH="100vh"
            minW="100vw"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgColor="gray.100"
        >
            {
                isLogging
                    ? <LoginForm onRegister={ () => setIsLogging( false ) } />
                    : <RegisterForm onLogin={ () => setIsLogging( true ) } />
            }
        </Box>
        </>
    )
}

export default Login;
