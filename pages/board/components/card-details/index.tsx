import { useRouter } from 'next/router';
import {
    Modal,
    ModalOverlay,
    useDisclosure,
    Text,
    ModalContent,
} from '@chakra-ui/react';

import { memo, useEffect } from 'react';
import ModalContainer from './components/ModalContainer';

const CardDetails = () => {

    // Instancia del router
    const { query, push } = useRouter();

    // Valida si el query contiene una cardId y si lo hay, muestra el modal
    useEffect(() => {
        if ( Object.keys( query ).includes('cardId') && Object.keys( query ).includes('listId')  ) { onOpen(); }
    }, [ query ]);

    // Hook para el manejo del modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Funcion para cerrar el modal
    const handleClose = () => {
        onClose();
        push(`/board/${ query.boardId }`);
    }

    return (
        <Modal size="xl" isOpen={ isOpen } onClose={ handleClose }>
            <ModalOverlay />

            {
                query.cardId
                    ? <ModalContainer
                        cardId={ query.cardId as string }
                        onClose={ handleClose }
                    />
                    : <ModalContent>
                            <Text
                            textAlign="center"
                            fontSize="2xl"
                            fontWeight="bold"
                            color="gray.500"
                            m="10"
                        >
                            Ocurrió un error al cargar la tarjeta
                        </Text>
                    </ModalContent>
            } 
        </Modal>
    )
}

export default memo( CardDetails );
