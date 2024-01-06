import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import themeReducer from '../slices/themeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  theme: themeReducer,
});

export default rootReducer;