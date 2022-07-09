import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useLocalStorage } from './useLocalStorage';

export const useAuth = (): void => {
    // Obtenemos la funcion para cambiar el token
    const [ , setToken ] = useLocalStorage<string | unknown>('token', '');

    // Obtenemos la sesion del usuario y si no esta autenticado redirigimos a la pagina de login
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated: () => {
            router.push('/login');
        }
    });

    // Si el usuario si esta autenticado, almacenamos el token en el localStorage
    useEffect(() => {
        setToken( session?.accessToken || '' );
    }, [ session ]);
}
