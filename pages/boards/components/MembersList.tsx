import { Box, Text } from '@chakra-ui/react';
import MemberItem from './MemberItem';

const MembersList = () => {

    const members = [
        1,2,3
    ];

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="2"
            mt="5"
        >
            {
                members.map( member => (
                    <MemberItem key={ member } />
                ))
            }
            <Text
                as="span"
                fontSize="sm"
                color="gray.500"
            >
                +5 Otros
            </Text>
        </Box>
    )
}

export default MembersList