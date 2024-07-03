
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../Redux/Movieslice';

export const store = configureStore({
  reducer: {
    films: movieReducer,
  },
});
