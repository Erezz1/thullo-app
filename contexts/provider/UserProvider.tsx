import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import { UserContext } from '../context';
import { getUserAuth } from 'utils';

interface IProps {
    children: ReactNode;
}

const UserProvider = ({ children }: IProps ) => {

    const { data: session } = useSession();

    // Obtiene el query client y el usuario autenticado
    const { data: user } = useQuery(['user'], getUserAuth, {
        refetchOnWindowFocus: false,
        retry: false,
    });

    // Almacena el token de la sesión en el localStorage
    useEffect(() => {
        if ( typeof window !== 'undefined' ) {
            window.localStorage.setItem('token', JSON.stringify( session?.accessToken || '' ));
        }
    }, []);

    return (
        <UserContext.Provider value={ user }>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;
