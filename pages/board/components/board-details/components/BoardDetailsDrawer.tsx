import { RefObject } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react';

import Created from './Created';
import Description from './Description';
import MembersList from './Members';
import { Members } from '../../../interfaces';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    btnRef: RefObject<any> | undefined;
}

const members: Members = [
    {
        id: '1',
        name: 'Juan',
        email: 'correo1@correo.com',
        image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg',
        isAdmin: true
    },
    {
        id: '2',
        name: 'Ernesto Perez',
        email: 'correo2@correo.com',
        image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg',
        isAdmin: false
    },
    {
        id: '3',
        name: 'Juan',
        email: 'correo23@correo.com',
        image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg',
        isAdmin: false
    },
    {
        id: '4',
        name: 'Juan',
        email: 'correo1@correo.com',
        image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg',
        isAdmin: true
    },
]

const BoardDetailsDrawer = ({ isOpen, onClose, btnRef }: IProps ) => {

    return (
        <Drawer
            isOpen={ isOpen }
            placement="right"
            onClose={ onClose }
            finalFocusRef={ btnRef }
            size="sm"
        >
            <DrawerOverlay />

            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottom="1px solid #ccc">Menu</DrawerHeader>

                <DrawerBody>
                    <Created creator={ members[0] } />
                    <Description />
                    <MembersList members={ members }/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default BoardDetailsDrawer;
