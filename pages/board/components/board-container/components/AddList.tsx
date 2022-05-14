import { FormEventHandler, useState } from 'react';
import {
    Box,
    Button,
    Input,
} from '@chakra-ui/react';
import { IoIosAdd } from 'react-icons/io';

const AddList = () => {

    const [ isAddingList, setIsAddingList ] = useState<boolean>( false );

    const handleCancelAddList = () => setIsAddingList( false );
    const handleAddList = () => setIsAddingList( true );
    const handleSubmitAddList: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        setIsAddingList( false );
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
                        onClick={ handleAddList }
                    >
                        Agrega otra lista
                    </Button>

                    : <Box
                        as="form"
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
                            _focus={{ outline: 'none' }}
                            placeholder="Nombre de la lista"
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
                            onClick={ handleCancelAddList }
                        >Cancelar</Button>
                    </Box>
            }
        </>
    )
}

export default AddList;
