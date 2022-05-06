import { Avatar, Tooltip } from '@chakra-ui/react';

const MemberItem = () => {
    return (
        <Tooltip
            label="Jhon Mirsha"
            bg="blue.500"
        >
            <Avatar
                src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
                name='John Doe'
                rounded="lg"
                size="sm"
            />
        </Tooltip>
    )
}

export default MemberItem;
