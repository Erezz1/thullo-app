import { useContext } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useQueryClient } from 'react-query';
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
import { IoIosArrowDown, IoMdExit } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';

import { UserContext } from 'contexts/context';

const Avatar = () => {

    // Obtiene el query client y el usuario autenticado
    const queryClient = useQueryClient();
    const user = useContext( UserContext );

    // Obtiene el router
    const router = useRouter();

    // Redirige al usuario a la página de login y cierra la sesión
    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
        queryClient.clear();

        // Limpia el token de la sesión
        if ( typeof window !== 'undefined' ) {
            window.localStorage.clear();
        }
    }

    // Muestra un boton para iniciar sesión si no hay un usuario autenticado
    if ( !user ) {
        return <Button
            rightIcon={ <FiLogIn /> }
            onClick={ () => router.push('/login') }
        >
            Iniciar sesión
        </Button>
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
