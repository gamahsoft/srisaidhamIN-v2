import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/slices/apiSlice";
import cartSliceReducer from "./features/slices/cartSlice";
import authReducer from "./features/slices/authSlice";
import calendarReducer from "./features/slices/calendarUISlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer,
    calendarui: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
