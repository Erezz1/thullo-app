import { useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Loading from '@/components/loading';

const Login: NextPage = () => {

    // Estado para verificar si el usuario se esta registrando o logueando
    const [ isLogging, setIsLogging ] = useState<boolean>( true );

    // Obtenemos la sesion del usuario y si esta logueado se redirige a la pagina principal
    const router = useRouter();
    const { status } = useSession();
    if ( status === 'authenticated' ) {
        router.push('/boards');
    }

    // Funciones para cambiar el estado de isLogging
    const register = () => setIsLogging( false );
    const login = () => setIsLogging( true );

    // Se valida el estado de la sesion, si se esta verificando la sesion del usuario se muestra el loading
    if ( status === 'loading' ) {
        return <Loading message="Validando sesion" />
    }

    return (
        <>
        <Head>
            <title>
                { isLogging ? 'Inicia Sesion' : 'Registrate' } | Thullo
            </title>
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
                    ? <LoginForm onRegister={ register } />
                    : <RegisterForm onLogin={ login } />
            }
        </Box>
        </>
    )
}

export default Login;
