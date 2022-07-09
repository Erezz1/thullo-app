import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import store from '../redux/store';
import '../styles/global.css';

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps ) => {

    return (
        <SessionProvider session={ session }>
            <Provider store={ store }>
                <ChakraProvider>
                    <Component { ...pageProps } />
                </ChakraProvider>
            </Provider>
        </SessionProvider>
    )
}

export default MyApp;
