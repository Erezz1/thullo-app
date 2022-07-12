import { FormEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Image,
    Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

import CoverMenu from './CoverMenu';
import { createBoard } from 'utils';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddBoard = ({ isOpen, onClose }: IProps ) => {

    // Estado de los inputs
    const [ name, setName ] = useState<string>('');
    const [ cover, setCover ] = useState<string>('');

    // Obtiene el router
    const router = useRouter();

    // Mutation para crear un tablero
    const { isLoading, mutate } = useMutation( createBoard, {
        onSuccess: data => router.push(`/board/${ data.id }`)
    });

    // Función que se ejecuta al hacer click en el botón de crear
    const handleSubmit: FormEventHandler<HTMLDivElement> = async ( event ) => {
        event.preventDefault();

        if ( name.length < 3 ) return;

        await mutate({ name, cover });
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />

            <ModalContent
                as="form"
                onSubmit={ handleSubmit }
            >
                <ModalBody
                    width="100%"
                    pt="5"
                >
                    <Button
                        colorScheme="blue"
                        color="#fff"
                        onClick={ onClose }
                        p={ 2 }
                        position="absolute"
                        top="2.5"
                        right="2.5"
                    >
                        <Icon as={ AiOutlineClose } />
                    </Button>

                    <Image
                        src={ cover }
                        alt="cover"
                        w="100%"
                        h="24"
                        objectFit="cover"
                        mb="5"
                        rounded="lg"
                    />

                    <Input
                        pr="4.5rem"
                        placeholder="Agregar titulo"
                        fontSize="sm"
                        rounded="lg"
                        border="none"
                        boxShadow="0px 2px 7px rgba(0, 0, 0, 0.1)"
                        mb="5"
                        value={ name }
                        onChange={ e => setName( e.target.value ) }
                        disabled={ isLoading }
                    />

                    <CoverMenu setCover={ setCover } />
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="ghost"
                        onClick={ onClose }
                        disabled={ isLoading }
                    >
                        Cancelar
                    </Button>

                    <Button
                        colorScheme="blue"
                        ml={3}
                        isLoading={ isLoading }
                        type="submit"
                    >
                        <Icon as={ IoMdAdd } fontSize="lg" mr="1" />
                        Crear
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddBoard;
