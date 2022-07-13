import {
    Avatar,
    Box,
    Text,
    useRadio,
    UseRadioProps
} from '@chakra-ui/react';

import { IUser } from 'types';

interface IProps {
    radio: UseRadioProps;
    userFound: IUser;
}

const MemberFound = ({ radio, userFound }: IProps ) => {

    const { getInputProps, getCheckboxProps } = useRadio( radio );

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label" w="full">
            <input { ...input } />
            <Box
                { ...checkbox }
                display="flex"
                alignItems="center"
                w="full"
                justifyContent="start"
                py="1" px="2"
                bgColor="transparent"
                cursor="pointer"
                transition="all 300ms"
                _checked={{ bgColor: 'gray.100' }}
                _hover={{ bgColor: 'gray.300' }}
            >
                <Avatar
                    name={ userFound.name }
                    src={ userFound.imageAvatar }
                    size="sm"
                />
                <Text fontWeight="500" ml="3">{ userFound.name }</Text>
            </Box>
        </Box>
    )
}

export default MemberFound;
