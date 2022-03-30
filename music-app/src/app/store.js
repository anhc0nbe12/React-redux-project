import { configureStore } from '@reduxjs/toolkit';
import userSlide from '../features/user/userSlide'
import playlistSlide from '../features/playlist/playlistSlide'

export const store = configureStore({
  reducer: {
    auth: userSlide,
    playlist:playlistSlide,
  },
});
