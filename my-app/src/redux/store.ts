import { configureStore } from "@reduxjs/toolkit";
import masterSlice from "./slices/masterSlice";

export const store = configureStore({
  reducer: {
    [masterSlice.name]: masterSlice.reducer 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
