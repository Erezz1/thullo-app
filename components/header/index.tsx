import Image from "next/image";
import { Box } from '@chakra-ui/react';

import Seeker from './components/Seeker';
import Avatar from './components/Avatar';

import logo from '@/public/images/Logo.svg';

const Header = () => {
    return (
        <Box
            as="header"
            width="full"
            py="3"
            px="5"
            backgroundColor="#fff"
            boxShadow="0px 2px 2px rgba(0, 0, 0, 0.05)"
            display="flex"
            flexDirection={["column", "column", "row"]}
            alignItems="center"
            justifyContent="space-between"
        >
            <Image
                src={ logo }
                alt="Logotipo"
            />

            <Box
                display="flex"
                flexDirection={["column", "row"]}
                alignItems="center"
                justifyContent="space-between"
                gap={["5", "10"]}
                mt={["5", "5", "0"]}
            >
                <Seeker />
                <Avatar />
            </Box>
        </Box>
    )
}

export default Header;
