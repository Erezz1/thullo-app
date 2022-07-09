import {
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Avatar as ImageAvatar,
    Icon,
    Button
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react';
import { IoIosArrowDown, IoMdExit } from 'react-icons/io';

const Avatar = () => {

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
                <MenuItem>Mis tableros</MenuItem>

                <MenuItem onClick={ handleLogout }>
                    Cerrar sesion
                    <Icon as={ IoMdExit } ml="2" />
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default Avatar;
