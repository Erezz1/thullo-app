import {
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

import Actions from './components/Actions';
import { ICard } from '../../interfaces';
import Description from './components/Description';

const card: ICard = {
    id: '1',
    title: '✋🏿 Move anything that is actually started here',
    cover: 'https://source.unsplash.com/random',
    description: `Ideas are created and share here through a card. 
Here you can describe what you'd like to accomplish.
For example you can follow three simple questions to create the card related to your idea:

  * Why  ? (Why do you wish to do it ?)
  * What ? (What it  is it, what are the goals, who is concerned)
  * How  ? (How do you think you can do it ? What are the required steps ?)

After creation, you can move your card to the todo list.`,
}

const CardDetails = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Modal size="xl" isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Image
                        src={ card.cover }
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
        </Modal>
    )
}

export default CardDetails;
