import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

import MemberItem from './MemberItem';
import { IUser } from 'types';
import { useQuery } from 'react-query';
import { getAllUsers } from 'utils';

interface IProps {
    members: string[];
    boardId: string;
}

const MembersList = ({ members: membersId, boardId }: IProps ) => {

    // Estado de los miembros
    const [ members, setMembers ] = useState<IUser[]>([]);
    const [ restOfMembers, setRestOfMembers ] = useState<IUser[]>([]);

    // Obtiene los miembros de un tablero
    useQuery(['members', boardId ], () => getAllUsers( membersId ), {
        onSuccess: data => {
            setMembers( data.slice(0, 3) );
            setRestOfMembers( data.slice(3) );
        },
        retry: false,
    });

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
                    <MemberItem
                        key={ member.id }
                        member={ member }
                    />
                ))
            }
            {
                restOfMembers?.length > 0 && (
                    <Text
                        as="span"
                        fontSize="sm"
                        color="gray.500"
                    >
                        +{ restOfMembers.length } Otros
                    </Text>
                )
            }
        </Box>
    )
}

export default MembersList