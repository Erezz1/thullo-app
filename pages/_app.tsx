import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import store from '../redux/store';
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
        <Provider store={ store }>
            <ChakraProvider>
                <Component { ...pageProps } />
            </ChakraProvider>
        </Provider>
    )
}

export default MyApp;
