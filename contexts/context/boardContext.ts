import { createContext } from 'react';

import { IBoard } from 'types';

const BoardContext = createContext<IBoard>({
    cover: '',
    name: '',
    lists: [],
    members: [],
    id: '',
    description: '',
});

export default BoardContext;
