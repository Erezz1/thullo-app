import { createContext } from 'react';
import { IUserLogged } from 'types';

export const UserContext = createContext<IUserLogged | null>( null );
