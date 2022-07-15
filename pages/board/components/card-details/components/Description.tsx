import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import {
    Box,
    Button,
    Icon,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { MdDescription } from 'react-icons/md';

import { updateCard } from 'utils';

interface IProps {
    cardId: string;
    title: string;
    description: string;
    cover: string;
    setDescription: Dispatch<SetStateAction<string>>;
}

const Description = ({ cardId, title, description, cover, setDescription }: IProps ) => {

    // Instancia del router
    const { query } = useRouter();

    // Instancia del query client
    const queryClient = useQueryClient();

    // Estado para editar o no la descripcion
    const [ isEditing, setIsEditing ] = useState<boolean>( false );

    // Mutacion para actualizar una tarjeta
    const { mutate, isLoading } = useMutation(
        ['card', cardId ],
        ({ cover, description }: { cover: string; description: string }) => updateCard({ id: cardId, title, cover, description }),
    )

    // Funcion para editar la descripcion
    const handleSave = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        if ( !cover || description.length < 10 ) {
            return;
        }

        mutate(
            {
                cover,
                description
            },
            {
                // Si se actualiza correctamente, actualiza el estado de la tarjeta y valida los cambios en la lista
                onSuccess: data => {
                    queryClient.setQueryData(['card', cardId ], data );
                    queryClient.invalidateQueries(['card', cardId ]);
                    queryClient.invalidateQueries(['list', query.listId ]);
                    setIsEditing( false );
                }
            }
        );
    };

    return (
        <Box>
            <Text fontWeight="500">{ title }</Text>
            <form onSubmit={ handleSave }>
                <Text
                    fontWeight="500"
                    fontSize="sm"
                    color="gray.500"
                    display="flex"
                    alignItems="center"
                    my="3"
                >
                    <Icon mr="2" as={ MdDescription } />
                    Descripcion
                </Text>
                <Textarea
                    h="2xs"
                    resize="none"
                    mb="3"
                    border="none"
                    p="0"
                    spellCheck="false"
                    fontSize="sm"
                    style={{
                        padding: isEditing ? "7px" : "0px",
                        border: isEditing ? "1px solid #ccc" : "none",
                    }}
                    _focus={{ outline: "none" }}
                    value={ description }
                    onChange={ event => setDescription( event.target.value ) }
                    onFocus={ () => setIsEditing( true ) }
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
                            onClick={ () => setIsEditing( false ) }
                            disabled={ isLoading }
                        >Cancelar</Button>
                    </>)
                }
            </form>
        </Box>
    )
}

export default Description;
