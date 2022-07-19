import { FormEvent, useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
    Button,
    Icon,
    Text,
    Textarea,
    useToast
} from '@chakra-ui/react';
import { MdDescription } from 'react-icons/md';

import { updateBoard } from 'utils';
import { BoardContext, UserContext } from 'contexts/context';

interface IProps {
    description: string;
}

const descriptionDefault = `Agrega una breve descripción de tu tablero. 📘🖋
Cada lista tiene un objetivo diferente.

Aquí hay 4 ejemplos de listas:

* Tareas 🗒: Tareas que deben ser realizadas, como: hacer las compras, iniciar el proyecto, etc.

* En proceso 🏃: Tareas que ya están siendo realizadas.

* En revisión ⚙: Tareas que han sido completadas, pero requieren una revisión.

* Completadas 🙌: Tareas que ya fueron completadas y revisadas.`;

const Description = ({ description }: IProps ) => {

    // Se obtiene el estado del tablero y el query client
    const queryClient = useQueryClient();
    const board = useContext( BoardContext );
    const user = useContext( UserContext );

    // Estado del textarea y funciones para actualizarlo
    const toast = useToast();
    const [ isEditing, setIsEditing ] = useState<boolean>( false );
    const [ newDescription, setNewDescription ] = useState<string>( description || descriptionDefault );

    // Mutación para actualizar la descripción
    const { mutate, isLoading } = useMutation(
        ( data: { name: string; description: string; } ) => updateBoard( data , board.id )
    );

    // Funciones para editar y cancelar la edición
    const handleEdit = () => setIsEditing( true );
    const handleCancelEdit = () => setIsEditing( false );

    // Funcion para guardar la descripción y actualizar el estado
    const handleSave = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        if ( newDescription.length < 10 ) {
            toast({
                title: 'La descripción debe tener al menos 10 caracteres',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            return;
        }

        mutate(
            {
                name: board.name,
                description: newDescription
            },
            {
                onSuccess: data => {
                    // Se actualiza el estado del tablero e invalida el cache del tablero
                    queryClient.setQueryData(['boards', board.id ], data );
                    setIsEditing( false );
                    queryClient.invalidateQueries(['boards', board.id ]);
                }
            }
        )
    };

    return (
        <>
        <Text
                fontWeight="500"
                fontSize="sm"
                color="gray.500"
                display="flex"
                alignItems="center"
        ><Icon as={ MdDescription } mr="2" />Descripcion</Text>

        <form onSubmit={ handleSave }>
            <Textarea
                h={["sm", "sm", "md"]}
                resize="none"
                my="3"
                border="none"
                p="0"
                spellCheck="false"
                style={{
                    padding: isEditing ? "7px" : "0px",
                    border: isEditing ? "1px solid #ccc" : "none",
                }}
                _focus={{ outline: "none" }}
                _disabled={{ color: 'black' }}
                cursor="text"
                disabled={ !board.admins?.includes( user?.id || '' ) }
                value={ newDescription }
                onChange={ event => setNewDescription( event.target.value ) }
                onFocus={ handleEdit }
            />
            {
                isEditing && (<>
                    <Button
                        colorScheme="green"
                        size="sm"
                        type="submit"
                        isLoading={ isLoading }
                    >Guardar</Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        ml="3"
                        onClick={ handleCancelEdit }
                        disabled={ isLoading }
                    >Cancelar</Button>
                </>)
            }
        </form>
        </>
    )
}

export default Description;
