import { configureStore } from "@reduxjs/toolkit";
import { userReducer, usersReducer } from "./Slices";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
