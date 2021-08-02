import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@Models";

type UserSliceState = {
  user?: User;
};

const initialState: UserSliceState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      return state;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
