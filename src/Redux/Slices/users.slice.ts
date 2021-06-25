import { User } from "../../Models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UsersSliceState = {
  users?: User[];
};

const initialState: UsersSliceState = {
  users: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

const usersReducer = usersSlice.reducer;

export default usersReducer;
