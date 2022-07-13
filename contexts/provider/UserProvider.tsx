import { ReactNode } from 'react';
import { useQuery } from 'react-query';

import { UserContext } from '../context';
import { getUserAuth } from 'utils';

interface IProps {
    children: ReactNode;
}

const UserProvider = ({ children }: IProps ) => {

    // Obtiene el query client y el usuario autenticado
    const { data: user } = useQuery(['user'], getUserAuth, {
        refetchOnWindowFocus: false,
        retry: false,
    });

    return (
        <UserContext.Provider value={ user }>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;
