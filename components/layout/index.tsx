import { ReactNode } from 'react';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import Header from '../header';

interface IProps {
    children: ReactNode;
    title: string;
}

const Layout = ({ children, title }: IProps ) => {

    return (
        <>
            <Head>
                <title>{ title } | Thullo</title>
            </Head>

            <Box
                height="100vh"
                width="100%"
            >
                <Header />
                { children }
            </Box>
        </>
    )
}

export default Layout;
