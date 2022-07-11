import { useRouter } from 'next/router';
import { Box, Image, Text } from '@chakra-ui/react';

import MembersList from './MembersList';
import { IBoard } from 'types';

interface IProps {
    board: IBoard
}

const BoardItem = ({ board }: IProps ) => {

    const router = useRouter();

    return (
        <Box
            p={4}
            bgColor="#fff"
            rounded="lg"
            shadow="md"
            cursor="pointer"
            isTruncated
            onClick={() => router.push(`/board/${ board.id }`)}
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

            <MembersList members={ board.members }/>
        </Box>
    )
}

export default BoardItem;
