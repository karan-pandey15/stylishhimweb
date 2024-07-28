 

// Cartslice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload; // Update the cart state with the loaded cart data
    },
    add(state, action) {
      state.push(action.payload); // Add new product to the state array
    },
    remove(state, action) {
      return state.filter(item => item._id !== action.payload); // Ensure _id is used
    }
  }
});

export const { setCart, add, remove } = cartSlice.actions;
export default cartSlice.reducer;
