import { FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
    Box,
    Button,
    Input,
} from '@chakra-ui/react';
import { IoIosAdd } from 'react-icons/io';

import { createCard } from 'utils';
import { IList } from 'types';

interface IProps {
    listId: string;
}

const AddCard = ({ listId }: IProps ) => {

    const [ isAddingCard, setIsAddingCard ] = useState<boolean>( false );
    const [ cardTitle, setCardTitle ] = useState<string>('');

    const queryClient = useQueryClient()
    const list = queryClient.getQueryData<IList>(['list', listId ]);

    const { isLoading, mutate } = useMutation(
        ( cardTitle: string ) => createCard({
            listId,
            description: '',
            title: cardTitle,
            cover: '',
        })
    )

    const handleSubmitAddCard: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        if ( cardTitle.length < 6 ) return;

        mutate(
            cardTitle,
            {
                onSuccess: newCard => {
                    queryClient.setQueryData(
                        ['list', list?.id ],
                        () => ( list && {
                            ...list,
                            cards: [ ...list?.cards, newCard ]
                        })
                    )
                    queryClient.invalidateQueries(['list', list?.id ]);

                    setCardTitle('');
                    setIsAddingCard( false );
                }
            }
        );
    }

    return (
        <>
        {
            !isAddingCard
                ? <Button
                    rightIcon={ <IoIosAdd fontSize="25" /> }
                    variant="outline"
                    colorScheme="blue"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    rounded="lg"
                    mb="5"
                    onClick={ () => setIsAddingCard( true ) }
                >
                    Agrega otra tarjeta
                </Button>

                : <Box
                    as="form"
                    w="100%"
                    p="3"
                    pt="0"
                    rounded="lg"
                    boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
                    mb="5"
                    bgColor="#FFF"
                    onSubmit={ handleSubmitAddCard }
                >
                    <Input
                        border="none"
                        mb="2"
                        p="0"
                        _focus={{ outline: 'none' }}
                        placeholder="Nombre de la tarjeta"
                        value={ cardTitle }
                        onChange={ event => setCardTitle( event.target.value ) }
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
                        onClick={ () => setIsAddingCard( false ) }
                        disabled={ isLoading }
                    >Cancelar</Button>
                </Box>
        }
        </>
    )
}

export default AddCard;