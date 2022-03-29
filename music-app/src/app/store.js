import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlide from '../features/user/userSlide'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: userSlide,
  },
});
