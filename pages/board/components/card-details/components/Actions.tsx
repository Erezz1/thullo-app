import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
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
import { AiFillDelete } from 'react-icons/ai';

import { covers } from 'helpers';
import { deleteCard } from 'utils';

interface IProps {
    cardId: string;
    setCover: Dispatch<SetStateAction<string>>;
    onClose: () => void;
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

const Actions = ({ setCover, cardId, onClose }: IProps ) => {

    // Instancia del router
    const { query } = useRouter();

    // Instancia del query client
    const queryClient = useQueryClient()

    // Mutacion para eliminar una tarjeta
    const { isLoading, mutate } = useMutation(
        ['card', cardId ],
        ( cardId: string ) => deleteCard( cardId, query.listId as string )
    )

    // Hook para manejar el radio group
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'cover',
        defaultValue: '',
        onChange: value => setCover( value ),
    })
    const group = getRootProps();

    // Funcion para eliminar una tarjeta
    const handleDelete = () => {
        mutate(
            cardId,
            {
                // Si se elimina correctamente, invalida la data de la lista y la actualiza
                onSuccess: () => {
                    queryClient.invalidateQueries(['list', query.listId ]);
                    onClose();
                }
            }
        );
    }

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

            <Button
                mt="3"
                w="100%"
                fontSize="sm"
                colorScheme="red"
                leftIcon={ <AiFillDelete /> }
                onClick={ handleDelete }
                isLoading={ isLoading }
            >
                Eliminar
            </Button>

            <MenuList p="4">
                <HStack
                    { ...group }
                    display="grid"
                    gridTemplateColumns="repeat(3, minmax(5rem, 1fr))"
                    gridGap="2"
                >
                    {
                        covers.map( value => {
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
