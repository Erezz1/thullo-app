import { FormEventHandler, useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
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
import { FcSearch } from 'react-icons/fc';

import MemberFound from './MemberFound';
import { addMemberToBoard, getUsersByQueries } from 'utils';
import { IUser } from 'types';
import { BoardContext } from 'contexts/context';

const AddMemberMenu = () => {

    // Obtiene el estado del tablero y el query client
    const board = useContext( BoardContext );
    const queryClient = useQueryClient();

    // Estado de los usuarios encontrados y del input de busqueda
    const [ userFound, setUserFound ] = useState<IUser[]>([]);
    const [ userSearch, setUserSearch ] = useState<string>('');

    // Estado del id del usuario que se agrega al tablero
    const [ userAdded, setUserAdded ] = useState<string>('');

    // Mutacion para encontrar usuarios
    const { mutate: mutateSearchUsers, isLoading: isLoadingUsers } = useMutation(
        ( name: string = '' ) => getUsersByQueries( name ),
    );

    // Mutacion para agregar un usuario al tablero
    const { mutate: mutateAddMember, isLoading: isLoadingAddMember } = useMutation(
        ( userId: string ) => addMemberToBoard( board.id, userId )
    );

    // Estado del radio group
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: '',
        onChange: setUserAdded,
    })
    const group = getRootProps()

    // Evento submit para buscar usuarios
    const handleSearchUsers: FormEventHandler<HTMLDivElement> | undefined = ( event ) => {
        event.preventDefault();
        mutateSearchUsers(
            userSearch,
            { onSuccess: data => { setUserFound( data ) } }
        );
    }

    // Funcion para agregar un usuario al tablero
    const handleAddMember = () => {
        if ( !userAdded ) return;

        mutateAddMember(
            userAdded,
            {
                onSuccess: data => {
                    queryClient.setQueryData(['board', board.id ], data.members );
                    queryClient.invalidateQueries(['members', board.id ]);
                    queryClient.invalidateQueries(['board', board.id ]);
                    setUserFound([]);
                    setUserSearch('');
                }
            }
        )
    }

    return (
        <Menu>
            <MenuButton
                as={ Button }
                colorScheme="blue"
                size="sm"
            >
                <IoMdAdd />
            </MenuButton>

            <MenuList p="3" shadow="sm">
                <Text fontWeight="500" mb="3">Agregar al tablero</Text>

                <InputGroup
                    size="md"
                    as="form"
                    onSubmit={ handleSearchUsers }
                >
                    <Input
                        pr="4.5rem"
                        placeholder="Usuarios..."
                        shadow="md"
                        value={ userSearch }
                        onChange={ e => setUserSearch( e.target.value ) }
                    />
                    <InputRightElement width="4.5rem">
                        <Button
                            h="1.75rem"
                            size="sm"
                            colorScheme="blue"
                            type="submit"
                            isLoading={ isLoadingUsers }
                            disabled={ isLoadingAddMember }
                        >
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
                        userFound.length >= 1
                            ? userFound?.map( userFound => (
                                <MemberFound
                                    key={ userFound.id }
                                    radio={ getRadioProps({ value: userFound.id }) }
                                    userFound={ userFound }
                                />
                            ))
                            : <Text
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="sm"
                                fontWeight="500"
                                color="gray.500"
                            >
                                Encuentra usuarios. <FcSearch size={15} />
                            </Text>
                    }
                </HStack>

                <Button
                    colorScheme="blue"
                    mt="5"
                    mx="auto"
                    display="block"
                    disabled={ isLoadingUsers }
                    isLoading={ isLoadingAddMember }
                    onClick={ handleAddMember }
                >
                    Agregar
                </Button>
            </MenuList>
        </Menu>
    )
}

export default AddMemberMenu;
