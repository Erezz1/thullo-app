import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps ) => {

    const [ isLogged, setIsLogged ] = useState<boolean>( true );

    useEffect(() => {
        setTimeout(() => {
            setIsLogged( false );
        }, 2000);
    }, [ setIsLogged ])

    if ( isLogged ) {
        return <div>Validando sesion del usuario...</div>;
    }

    return (
        <ChakraProvider>
            <Component { ...pageProps } />
        </ChakraProvider>
    )
}

export default MyApp;
