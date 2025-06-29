import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // NOTE: Check whether product added already in the cart or not
      const { ...item } = action.payload;

      const existItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state, item);
    },
    // addToCart: (state, action) => {
    //   // NOTE: Check whether service added already in the cart or not
    //   const { ...item } = action.payload;
    //   const cartItemIndex = state.cartItems.findIndex(
    //     (cartItem) => cartItem._id === item._id
    //   );

    //   console.log("cartItemIndex", cartItemIndex);

    //   if (cartItemIndex >= 0) {
    //     state.cartItems[cartItemIndex].cartQty += 1;
    //     console.log("cartItemIndex >= 0", cartItemIndex);
    //   } else {
    //     const addService = { ...action.payload, cartQty: 1 };
    //     state.cartItems = [...state.cartItems, addService];
    //     console.log(
    //       "state.cartItems = [...state.cartItems, { item, cartQty: 1 }];",
    //       state.cartItems
    //     );
    //   }

    //   return updateCart(state);
    // },
    increaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload
      );

      state.cartItems[itemIndex].cartQty += 1;

      return updateCart(state);
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload
      );
      if (state.cartItems[itemIndex].cartQty > 1) {
        state.cartItems[itemIndex].cartQty -= 1;
      } else if (state.cartItems[itemIndex].cartQty === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload
        );
        state.cartItems = nextCartItems;
      }
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
  increaseCart,
  decreaseCart,
} = cartSlice.actions;

export default cartSlice.reducer;
