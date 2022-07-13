import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import {
    Box,
    Image,
    Text
} from '@chakra-ui/react';

import MembersList from './MembersList';
import { getBoardById } from 'utils';

interface IProps {
    boardId: string;
}

const BoardItem = ({ boardId }: IProps ) => {

    const router = useRouter();

    // Obtiene un tablero por su id
    const { data: board } = useQuery(
        ['board', boardId ],
        () => getBoardById( boardId ),
        { retry: false }
    );

    // Si no existe el tablero, no se muestra nada
    if ( !board ) {
        return null;
    }

    return (
        <Box
            p={4}
            bgColor="#fff"
            rounded="lg"
            shadow="md"
            cursor="pointer"
            isTruncated
            onClick={() => router.push(`/board/${ board?.id }`)}
        >
            <Image
                src={ board?.cover }
                alt="cover"
                w="100%"
                h="36"
                objectFit="cover"
                rounded="lg"
            />

            <Text
                fontWeight="500"
                my="2"
                isTruncated
            >
                { board?.name }
            </Text>

            <MembersList
                members={ board?.members }
                boardId={ board?.id }
            />
        </Box>
    )
}

export default BoardItem;
