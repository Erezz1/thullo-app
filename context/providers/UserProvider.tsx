import { useState, FC, ReactNode } from 'react';
import { useQuery } from 'react-query';

import { UserContext } from '../contexts';
import { getUserAuth } from 'utils';
import { IUserLogged } from 'types';

interface IProps {
    children: ReactNode;
}

const UserProvider:FC<IProps> = ({ children }) => {

    // Crea un estado de los datos del usuario
    const [ user, setUser ] = useState<IUserLogged | null>( null );

    // Obtiene los datos del usuario del servidor
    useQuery(['user'], getUserAuth, {
        onSuccess: data => setUser( prev => data ),
        retry: false,
        refetchOnWindowFocus: false,
    });

    return (
        <UserContext.Provider value={ user }>
            { children }
        </UserContext.Provider>
    );
}

export default UserProvider;
