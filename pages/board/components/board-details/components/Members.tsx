import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
    Avatar,
    Box,
    Button,
    Icon,
    Text
} from '@chakra-ui/react';
import { BsPeopleFill } from 'react-icons/bs';

import { Members } from '../../../interfaces';
import { deleteMemberFromBoard } from 'utils';
import { BoardContext, UserContext } from 'contexts/context';

interface IProps {
    members: Members;
}

const Members = ({ members }: IProps ) => {

    // Obtiene el estado del tablero, el usuario y el query client
    const queryClient = useQueryClient();
    const board = useContext( BoardContext );
    const user = useContext( UserContext );

    const userIsAdmin = board.admins?.includes( user?.id || '' );

    // Mutacion para eliminar un miembro de un tablero
    const { mutate, isLoading } = useMutation(
        ( userId: string ) => deleteMemberFromBoard( board.id, userId )
    );

    // Elimina un miembro de un tablero y actualiza el estado del tablero y miembros
    const handleDelete = ( userId: string ) => {
        mutate(
            userId,
            {
                onSuccess: data => {
                    queryClient.setQueryData(['board', board.id ], data.members );
                    queryClient.invalidateQueries(['members', board.id ]);
                    queryClient.invalidateQueries(['board', board.id ]);
                }
            }
        );
    }

    return (
        <>
        <Text
            fontWeight="500"
            fontSize="sm"
            color="gray.500"
            display="flex"
            alignItems="center"
            mt="5"
        ><Icon as={ BsPeopleFill } mr="2" />Miembros</Text>
        <Box
            display="flex"
            flexDir="column"
            w="100%"
        >
            {
                members.map( member => (
                    <Box
                        key={ member.id }
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt="3"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <Avatar
                                name={ member.name }
                                src={ member.image }
                                size="sm"
                            />
                            <Text
                                fontWeight="500"
                                ml="3"
                                fontSize="sm"
                            >{ member.name }</Text>
                        </Box>

                        {
                            member.isAdmin
                                ? <Text
                                    justifySelf="flex-end"
                                    fontSize="sm"
                                    color="gray.500"
                                    fontWeight="500"
                                >
                                    Admin
                                </Text>
                                : userIsAdmin && <Button
                                    variant="outline"
                                    colorScheme="red"
                                    size="xs"
                                    onClick={ () => handleDelete( member.id ) }
                                    isLoading={ isLoading }
                                >
                                    Remover
                                </Button>
                        }
                    </Box>
                ))
            }
        </Box>
        </>
    )
}

export default Members;
