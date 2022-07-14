import { createContext } from 'react';

import { IList } from 'types';

const BoardContext = createContext<IList[]>([]);

export default BoardContext;
