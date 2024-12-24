import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import stateCitySlice from './slices/stateCitySlice';
import postSlice from './slices/postSlice';
import tagSlice from './slices/tagSlices';
import searchSlice from './slices/searchSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    stateCity: stateCitySlice,
    postSlice: postSlice,
    tagSlice: tagSlice,
    searchSlice: searchSlice
  },
});

export default store;
