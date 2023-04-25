import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/todoReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
