import { useQuery } from 'react-query';
import {
    IconButton,
    Image,
    ModalBody,
    ModalContent,
    ModalHeader,
    Spinner,
    Text
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

import Actions from './Actions';
import Description from './Description';
import { getCardById } from 'utils';

interface IProps {
    cardId: string;
    onClose: () => void;
}

const coverDefault = 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80';

const ModalContainer = ({ cardId, onClose }: IProps ) => {

    // Obtencion de la tarjeta
    const { data: card, isLoading } = useQuery(
        ['card', cardId ],
        () => getCardById( cardId ),
        {
            // Si hay un error, se cierra el modal
            onError: () => onClose(),
        }
    )

    if ( isLoading ) {
        return <Spinner />
    }

    if ( !card ) {
        return <ModalContent>
            <Text
                textAlign="center"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.500"
            >
                Tarjeta no encontrada...
            </Text>
        </ModalContent>;
    }

    return (
        <ModalContent>
            <ModalHeader>
                <Image
                    src={ card.cover ? card.cover : coverDefault }
                    alt={ card.title }
                    w="100%"
                    h="32"
                    objectFit="cover"
                    rounded="lg"
                />
            </ModalHeader>
            <IconButton
                aria-label="Close modal"
                icon={ <AiOutlineClose fontSize="1.2rem" /> }
                colorScheme="blue"
                position="absolute"
                top="2"
                right="2"
                size="sm"
                onClick={ onClose }
            />

            <ModalBody
                display="grid"
                gridTemplateColumns="3fr 1fr"
                gridGap="2"
            >
                <Description
                    title={ card.title }
                    description={ card.description }
                />
                <Actions />
            </ModalBody>
        </ModalContent>
    )
}

export default ModalContainer;
