import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    name: string;
}

const initialState: UserState = {
    name: 'Ernesto',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser( state, action: PayloadAction<string> ) {
            state.name = action.payload;
        },
    },
})

export const { setUser } = userSlice.actions;
export default userSlice;
