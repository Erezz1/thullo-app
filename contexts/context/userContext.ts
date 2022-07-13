import { createContext } from 'react';

import { IUserLogged } from 'types';

const UserContext = createContext<IUserLogged | undefined>( undefined );

export default UserContext;
