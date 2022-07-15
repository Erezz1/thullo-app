import { Dispatch, SetStateAction, useEffect } from 'react';
import {
    Box,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    useRadio,
    useRadioGroup,
} from '@chakra-ui/react'
import { BsFillImageFill } from 'react-icons/bs'

import { covers } from 'helpers';

interface ICoverProps {
    setCover: Dispatch<SetStateAction<string>>;
}

const CoverOption = ( props: any ) => {

    const { getInputProps, getCheckboxProps } = useRadio( props );

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label" w="full">
            <input { ...input } />
            <Box
                { ...checkbox }
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

const CoverMenu = ({ setCover }: ICoverProps ) => {

    // Permite seleccionar una imagen de una lista de opciones
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'cover',
        defaultValue: covers[0],
        onChange: e => setCover( e ),
    })

    const group = getRootProps();

    // Da por defecto la primera imagen de la lista
    useEffect(() => {
        setCover( covers[0] );
    }, [ setCover ]);

    return (
        <Menu>
            <MenuButton
                as={ Button }
                leftIcon={<BsFillImageFill />}
                fontSize="sm"
                w={["50%", "50%", "33%"]}
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
                        covers.map( cover => {
                            const radio = getRadioProps({ value: cover })
                            return (
                                <CoverOption
                                    key={ cover }
                                    { ...radio }
                                />
                            )
                        })
                    }
                </HStack>
            </MenuList>
        </Menu>
    )
}

export default CoverMenu