import { Avatar, Box, Button, Text, useRadio, UseRadioProps } from '@chakra-ui/react';

const MemberFound = ( props: UseRadioProps ) => {

    const { getInputProps, getCheckboxProps } = useRadio( props );

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label" w="full">
            <input { ...input } />
            <Box
                { ...checkbox }
                display="flex"
                alignItems="center"
                w="full"
                justifyContent="start"
                py="1" px="2"
                bgColor="transparent"
                cursor="pointer"
                transition="all 300ms"
                _checked={{ bgColor: 'gray.100' }}
                _hover={{ bgColor: 'gray.300' }}
            >
                <Avatar
                    name="John Doe"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg"
                    size="sm"
                    rounded="lg"
                />
                <Text fontWeight="500" ml="3">John Doe</Text>
            </Box>
        </Box>
    )
}

export default MemberFound;
