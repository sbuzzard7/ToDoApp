import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// Reducers handle logic that allows user to update and return state
// In this case, creates a new array for storage of To Do tasks */
