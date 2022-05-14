import {
    Avatar,
    Box,
    Button,
    Icon,
    Text
} from '@chakra-ui/react';
import { BsPeopleFill } from 'react-icons/bs';

import { Members } from '../../../interfaces';

interface IProps {
    members: Members;
}

const Members = ({ members }: IProps ) => {

    return (
        <>
        <Text
            fontWeight="500"
            fontSize="sm"
            color="gray.500"
            display="flex"
            alignItems="center"
            mt="5"
        ><Icon as={ BsPeopleFill } mr="2" />Miembros</Text>
        <Box
            display="flex"
            flexDir="column"
            w="100%"
        >
            {
                members.map( member => (
                    <Box
                        key={ member.id }
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt="3"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <Avatar
                                name={ member.name }
                                src={ member.image }
                                rounded="lg"
                                size="sm"
                            />
                            <Text
                                fontWeight="500"
                                ml="3"
                                fontSize="sm"
                            >{ member.name }</Text>
                        </Box>

                        {
                            member.isAdmin
                                ? <Text
                                    justifySelf="flex-end"
                                    fontSize="sm"
                                    color="gray.500"
                                    fontWeight="500"
                                >
                                    Admin
                                </Text>
                                : <Button
                                    variant="outline"
                                    colorScheme="red"
                                    size="xs"
                                >
                                    Remover
                                </Button>
                        }
                    </Box>
                ))
            }
        </Box>
        </>
    )
}

export default Members;
