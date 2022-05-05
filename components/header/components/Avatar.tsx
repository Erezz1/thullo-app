import {
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Avatar as ImageAvatar,
    Text,
    Icon
} from '@chakra-ui/react'
import { IoIosArrowDown, IoMdExit } from 'react-icons/io';

const Avatar = () => {
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

                <MenuButton as="button">
                    Dan Abrahmov
                    <Icon ml="2" as={ IoIosArrowDown } />
                </MenuButton>
            </Box>

            <MenuList>
                <MenuItem>Mis tableros</MenuItem>

                <MenuItem>
                    Cerrar sesion
                    <Icon as={ IoMdExit } ml="2" />
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default Avatar;
