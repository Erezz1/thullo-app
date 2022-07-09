import { useRouter } from 'next/router';
import {
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Avatar as ImageAvatar,
    Icon,
    Button
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { useQuery } from 'react-query';
import { IoIosArrowDown, IoMdExit } from 'react-icons/io';

import axiosInstance from '@/client/axiosInstance';

const Avatar = () => {

    const router = useRouter();
    const { data, isLoading, error } = useQuery('user', () => axiosInstance.get('/user'));

    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    }

    return (
        <Menu>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="2"
            >
                <ImageAvatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                    rounded="xl"
                    w="10"
                    h="10"
                />

                <MenuButton
                    as={ Button }
                    variant="ghost"
                >
                    Dan Abrahmov
                    <Icon ml="2" as={ IoIosArrowDown } />
                </MenuButton>
            </Box>

            <MenuList as="nav">
                <MenuItem
                    onClick={ () => router.push('/boards') }
                >Mis tableros</MenuItem>

                <MenuItem onClick={ handleLogout }>
                    Cerrar sesion
                    <Icon as={ IoMdExit } ml="2" />
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default Avatar;
