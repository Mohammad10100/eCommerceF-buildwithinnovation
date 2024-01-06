// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[],
  count: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')).length:0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
      state.count = ++state.count;
      localStorage.setItem('count', JSON.stringify(state.count));
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
