import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slices/userSlice';

const reducers = {
    user: userSlice.reducer
};

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
