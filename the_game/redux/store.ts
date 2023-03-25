// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slices/counterSlice';
import authReducer from './Slices/authSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
