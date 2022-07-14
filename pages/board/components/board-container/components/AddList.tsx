import { FormEventHandler, useState, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
    Box,
    Button,
    Input,
} from '@chakra-ui/react';
import { IoIosAdd } from 'react-icons/io';
import { BoardContext } from 'contexts/context';
import { createList } from 'utils';

const AddList = () => {

    // Obtiene el contexto del tablero
    const board = useContext( BoardContext );

    // Estado del formulario
    const [ isAddingList, setIsAddingList ] = useState<boolean>( false );
    const [ listName, setListName ] = useState<string>('');

    // Obtencion del query client
    const queryClient = useQueryClient();

    // Mutation para crear una lista
    const { mutate, isLoading } = useMutation(
        ['board', board.id ],
        ({ name, boardId }: { name: string, boardId: string }) => createList({ name, boardId })
    )

    // Evento para crear una lista
    const handleSubmitAddList: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        if ( listName.length < 5 ) { return }

        mutate(
            {
                name: listName,
                boardId: board.id,
            },
            {
                onSuccess: data => {
                    // Agregar la lista al contexto de listas y valida que en la base de datos ya exista la lista
                    queryClient.setQueryData(
                        ['board', board.id ],
                        () => ({
                            ...board,
                            lists: [ ...board.lists, data.id ],
                        })
                    )
                    queryClient.invalidateQueries(['board', board.id ]);

                    setIsAddingList( false );
                    setListName('');
                }
            }
        )
    }

    return (
        <>
            {
                !isAddingList
                    ? <Button
                        rightIcon={ <IoIosAdd fontSize="25" /> }
                        variant="outline"
                        colorScheme="blue"
                        minW="2xs"
                        w="2xs"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        rounded="lg"
                        onClick={ () => setIsAddingList( true ) }
                    >
                        Agrega otra lista
                    </Button>

                    : <Box
                        as="form"
                        minW="2xs"
                        w="2xs"
                        p="3"
                        h="20"
                        pt="0"
                        rounded="lg"
                        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
                        mb="5"
                        bgColor="#FFF"
                        onSubmit={ handleSubmitAddList }
                    >
                        <Input
                            border="none"
                            mb="2"
                            p="0"
                            w="100%"
                            _focus={{ outline: 'none' }}
                            placeholder="Nombre de la lista"
                            value={ listName }
                            onChange={ event => setListName( event.target.value ) }
                        />
                        <Button
                            colorScheme="green"
                            size="xs"
                            mr="2"
                            type="submit"
                            isLoading={ isLoading }
                        >Guardar</Button>
                        <Button
                            variant="ghost"
                            size="xs"
                            onClick={ () => setIsAddingList( false ) }
                            disabled={ isLoading }
                        >Cancelar</Button>
                    </Box>
            }
        </>
    )
}

export default AddList;
