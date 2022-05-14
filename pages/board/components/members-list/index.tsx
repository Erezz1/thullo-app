import { Box } from '@chakra-ui/react';

import AddMemberMenu from './components/AddMemberMenu';
import MemberItem from './components/MemberItem';

const MembersLists = () => {

    const members = [
        1,2,3,4
    ];

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap="4"
        >
            {
                members.map( member => (
                    <MemberItem key={ member } />
                ))
            }

            <AddMemberMenu />
        </Box>
    )
}

export default MembersLists;
