import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type TRootState = ReturnType<typeof store.getState>;
export default store;
