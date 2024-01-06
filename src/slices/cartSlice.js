// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: localStorage.getItem('items')? localStorage.getItem('items'):[]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
