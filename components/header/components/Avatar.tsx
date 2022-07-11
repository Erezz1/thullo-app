import { useContext } from 'react';
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
import { IoIosArrowDown, IoMdExit } from 'react-icons/io';

import { UserContext } from 'context/contexts';

const Avatar = () => {

    // Obtiene el contexto de usuario y el router
    const user = useContext( UserContext );
    const router = useRouter();

    // Redirige al usuario a la página de login y cierra la sesión
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
                    name={ user?.name }
                    src={ user?.imageAvatar }
                    w="10"
                    h="10"
                />

                <MenuButton
                    as={ Button }
                    variant="ghost"
                >
                    { user?.name }
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
