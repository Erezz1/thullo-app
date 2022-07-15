import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Loading from '@/components/loading';
import axiosInstance from '@/client/axiosInstance';
import '../styles/global.css';

const queryClient = new QueryClient();

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps ) => {

    const [ isLoading, setIsLoading ] = useState<boolean>( true );

    useEffect(() => {
        axiosInstance.get('/api').then(
            () => setIsLoading( false )
        );
    }, []);

    if ( isLoading ) {
        return <Loading message="Despertando el servidor..." />
    }

    return (
        <SessionProvider session={ session } basePath="/login" >
            <QueryClientProvider client={ queryClient }>
                <ChakraProvider>
                    <Component { ...pageProps } />
                </ChakraProvider>

                <ReactQueryDevtools initialIsOpen={ false } />
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default MyApp;
