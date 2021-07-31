import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserDbo } from "@Models";

type UsersSliceState = {
  users?: UserDbo[];
};

const initialState: UsersSliceState = {
  users: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserDbo[]>) => {
      state.users = action.payload;
    },
    deleteUsers: (state, action: PayloadAction<string[]>) => {
      state.users = state?.users?.filter(
        (a) => !action.payload.includes(a.userId)
      );
    },
  },
});

export const { setUsers, deleteUsers } = usersSlice.actions;

const usersReducer = usersSlice.reducer;

export default usersReducer;
