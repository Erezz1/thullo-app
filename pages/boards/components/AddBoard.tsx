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
    Select,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

import CoverMenu from './CoverMenu';

const AddBoard = ({ isOpen, onClose }: IProps ) => {

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />

            <ModalContent>
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
                        src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
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
                    />

                    <CoverMenu />
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={ onClose }>
                        Cancelar
                    </Button>

                    <Button colorScheme="blue" ml={3} onClick={ onClose }>
                        <Icon as={ IoMdAdd } fontSize="lg" mr="1" />
                        Crear
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default AddBoard;
