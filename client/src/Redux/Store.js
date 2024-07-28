// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { setCart } from "./Cartslice";

// Load cart state from local storage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save cart state to local storage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch {
    // Ignore write errors
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCartState(), // Load initial state from local storage
});

// Subscribe to store changes to save cart state to local storage
store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export default store;
