import { useRef } from 'react';
import {
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { AiOutlineEllipsis } from 'react-icons/ai';

import BoardDetailsDrawer from './components/BoardDetailsDrawer';

const BoardDetails = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<any>();

    return (
        <>
            <Button
                ref={ btnRef }
                colorScheme="gray"
                onClick={ onOpen }
                leftIcon={ <AiOutlineEllipsis fontSize="1.5rem" /> }
            >
                Mostrar menu
            </Button>

            <BoardDetailsDrawer
                isOpen={ isOpen }
                onClose={ onClose }
                btnRef={ btnRef }
            />
        </>
    )
}

export default BoardDetails;
