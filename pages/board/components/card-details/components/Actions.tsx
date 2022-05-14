import {
    Box,
    Button,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Text,
    useRadio,
    useRadioGroup,
} from '@chakra-ui/react'
import { BsFillImageFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

const options = [
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1453475250267-163ff185e88e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
    'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    'https://images.unsplash.com/photo-1651715191764-10bc33bd0c3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
]

const CoverOption = ( props: any ) => {

    const { getInputProps, getCheckboxProps } = useRadio( props );

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label" w="full">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                bgImage={ props.value }
                bgSize="cover"
                bgPosition="center"
                opacity="0.5"
                _checked={{
                    color: 'white',
                    border: '2px solid #3182CE',
                    opacity: '1',
                }}
                w="full" h="2.5rem"
            />
        </Box>
    )
}

const Actions = () => {

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'cover',
        defaultValue: options[0],
        // onChange: console.log,
    })

    const group = getRootProps()

    return (
        <Box>
        <Menu>
            <Text
                fontWeight="500"
                fontSize="sm"
                color="gray.500"
                display="flex"
                alignItems="center"
                mb="3"
            >
                <Icon mr="2" as={ IoMdSettings } />
                Acciones
            </Text>

            <MenuButton
                as={ Button }
                leftIcon={<BsFillImageFill />}
                fontSize="sm"
                w="100%"
            >
                Portada
            </MenuButton>

            <MenuList p="4">
                <HStack
                    {...group}
                    display="grid"
                    gridTemplateColumns="repeat(3, minmax(5rem, 1fr))"
                    gridGap="2"
                >
                    {
                        options.map( value => {
                            const radio = getRadioProps({ value })
                            return (
                                <CoverOption
                                    key={ value }
                                    { ...radio }
                                />
                            )
                        })
                    }
                </HStack>
            </MenuList>
        </Menu>
        </Box>
    )
}

export default Actions;
