import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/slices/apiSlice";
import { eventsSlice } from "./features/slices/eventsSlice";
import cartSliceReducer from "./features/slices/cartSlice";
import authReducer from "./features/slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
