import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@Models";

type UserSliceState = {
  user?: User;
  auth?: boolean;
};

const initialState: UserSliceState = {
  user: undefined,
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (state.user) {
        state.auth = true;
      } else {
        state.auth = false;
      }
      return state;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
      return state;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.auth = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser, setAuth } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
