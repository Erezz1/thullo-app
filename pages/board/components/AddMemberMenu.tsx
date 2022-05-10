import {
    Box,
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuList,
    Text,
    useRadioGroup
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

import MemberFound from './MemberFound';

const AddMemberMenu = () => {

    const members = ['1','2','3'];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    })

    const group = getRootProps()

    return (
        <Menu>
            <MenuButton
                as={ Button }
                colorScheme="blue"
            >
                <IoMdAdd />
            </MenuButton>

            <MenuList p="3" shadow="sm">
                <Text fontWeight="500" mb="3">Agregar al tablero</Text>

                <InputGroup
                    size="md"
                    as="form"
                >
                    <Input
                        pr="4.5rem"
                        placeholder="Usuarios..."
                        shadow="md"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" colorScheme="blue" type="submit">
                            <AiOutlineSearch />
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <HStack
                    { ...group }
                    shadow="md"
                    py="3" mt="3"
                    border="1px solid #eee"
                    rounded="md"
                    display="flex"
                    flexDir="column"
                    gap="3"
                >
                    {
                        members.map( value => {
                            const radio = getRadioProps({ value })

                            return (
                                <MemberFound key={ value } { ...radio } />
                            )
                        })
                    }
                </HStack>

                <Button
                    colorScheme="blue"
                    mt="5" mx="auto"
                    display="block"
                >
                    Agregar
                </Button>
            </MenuList>
        </Menu>
    )
}

export default AddMemberMenu