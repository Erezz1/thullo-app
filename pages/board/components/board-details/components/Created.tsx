import {
    Avatar,
    Box,
    Icon,
    Text
} from '@chakra-ui/react';
import { BsPersonCircle } from 'react-icons/bs';

import { Member } from '../../../interfaces';

interface IProps {
    creator: Member;
}

const Created = ({ creator }: IProps ) => {

    return (
        <>
        <Text
            fontWeight="500"
            fontSize="sm"
            color="gray.500"
            display="flex"
            alignItems="center"
        ><Icon as={ BsPersonCircle } mr="2" />Hecho por</Text>
        <Box
            display="flex"
            my="3"
        >
            <Avatar
                name={ creator?.name }
                src={ creator?.image }
            />
            <Text
                fontWeight="500"
                ml="3"
            >{ creator?.name }</Text>
        </Box>
        </>
    )
}

export default Created