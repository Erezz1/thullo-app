import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import '../styles/global.css';

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps ) => (
    <SessionProvider session={ session }>
        <ChakraProvider>
            <Component { ...pageProps } />
        </ChakraProvider>
    </SessionProvider>
)

export default MyApp;
