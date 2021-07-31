import { configureStore } from "@reduxjs/toolkit";

import { partiesReducer, userReducer, usersReducer } from "./Slices";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    parties: partiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
