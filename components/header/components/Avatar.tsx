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
import { useQuery } from 'react-query';
import { getUserAuth } from 'utils';
const Avatar = () => {

    // Obtiene el usuario autenticado y hace refetch de los tableros
    const queryClient = useQueryClient();
    const { data: user } = useQuery(['user'], getUserAuth, {
        refetchOnWindowFocus: false,
        retry: false,
        onSuccess: data => queryClient.invalidateQueries(['boards']),
    });

    // Obtiene el router
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
