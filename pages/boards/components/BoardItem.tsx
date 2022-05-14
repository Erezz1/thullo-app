import { useRouter } from 'next/router';
import { Box, Image, Text } from '@chakra-ui/react';

import MembersList from './MembersList';

const BoardItem = () => {

    const router = useRouter();

    return (
        <Box
            p={4}
            bgColor="#fff"
            rounded="lg"
            shadow="md"
            cursor="pointer"
            isTruncated
            onClick={() => router.push(`/board/1`)}
        >
            <Image
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
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
                Devchallenge Board
            </Text>

            <MembersList />
        </Box>
    )
}

export default BoardItem;
