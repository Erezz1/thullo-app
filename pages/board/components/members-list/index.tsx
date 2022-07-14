import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import AddMemberMenu from './components/AddMemberMenu';
import MemberItem from './components/MemberItem';
import { getAllUsers } from 'utils';
import { BoardContext, UserContext } from 'contexts/context';

const MembersLists = () => {

    // Obtiene el estado del tablero
    const board = useContext( BoardContext );
    const user = useContext( UserContext );

    // Obtiene los miembros de un tablero
    const { data: members } = useQuery(
        ['members', board?.id ],
        () => getAllUsers( board?.members || [] ),
        { retry: false }
    );

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap="4"
        >
            {
                members && members?.map( member => (
                    <MemberItem
                        key={ member.id }
                        member={ member }
                    />
                ))
            }

            {
                user && board.admins.includes( user?.id ) && (
                    <AddMemberMenu />
                )
            }
        </Box>
    )
}

export default MembersLists;
