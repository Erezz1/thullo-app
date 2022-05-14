import { useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Login: NextPage = () => {

    const [ isLogging, setIsLogging ] = useState<boolean>( true );

    const register = () => setIsLogging( false );
    const login = () => setIsLogging( true );

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
                    ? <LoginForm register={ register } />
                    : <RegisterForm login={ login } />
            }
        </Box>
        </>
    )
}

export default Login;
