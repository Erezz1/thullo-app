import { RefObject, useContext, useState } from 'react';
import { useQuery } from 'react-query';
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
import { BoardContext } from 'contexts/context';
import { getAllUsers } from 'utils';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    btnRef: RefObject<any> | undefined;
}

const BoardDetailsDrawer = ({ isOpen, onClose, btnRef }: IProps ) => {

    const [ members, setMembers ] = useState<Members>([]);

    // Obtiene el estado del tablero
    const board = useContext( BoardContext );

    // Obtiene los miembros de un tablero
    useQuery(
        ['members', board?.id ],
        () => getAllUsers( board?.members || [] ),
        {
            onSuccess: data => {
                const members: Members = data.map( member => ({
                    id: member.id,
                    name: member.name,
                    isAdmin: board.admins.includes( member.id ),
                    image: member.imageAvatar
                }));
                setMembers( members );
            },
            retry: false
        }
    );

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
                    <Description description={ board.description } />
                    <MembersList members={ members }/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default BoardDetailsDrawer;
