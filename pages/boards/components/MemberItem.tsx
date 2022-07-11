import { Avatar, Tooltip } from '@chakra-ui/react';

import { IUser } from 'types';

interface IProps {
    member: IUser;
}

const MemberItem = ({ member }: IProps ) => {

    return (
        <Tooltip
            label={ member.name }
            bg="blue.500"
        >
            <Avatar
                src={ member.imageAvatar } 
                name={ member.name }
                size="sm"
            />
        </Tooltip>
    )
}

export default MemberItem;
