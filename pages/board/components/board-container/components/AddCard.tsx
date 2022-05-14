import { FormEventHandler, useState } from 'react';
import {
    Box,
    Button,
    Input,
} from '@chakra-ui/react';
import { IoIosAdd } from 'react-icons/io';

const AddCard = () => {

    const [ isAddingCard, setIsAddingCard ] = useState<boolean>( false );

    const handleAddCard = () => setIsAddingCard( true );
    const handleCancelAddCard = () => setIsAddingCard( false );
    const handleSubmitAddCard: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        setIsAddingCard( false );
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
                    onClick={ handleAddCard }
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
                    />
                    <Button
                        colorScheme="green"
                        size="xs"
                        mr="2"
                        type="submit"
                    >Guardar</Button>
                    <Button
                        variant="ghost"
                        size="xs"
                        onClick={ handleCancelAddCard }
                    >Cancelar</Button>
                </Box>
        }
        </>
    )
}

export default AddCard;
