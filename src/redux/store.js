import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/authSlice' 
import  blogReducer from './features/blog.slice';

export const store = configureStore({
  reducer: {
   auth: authSlice.reducer,
    blog: blogReducer,
  },
})