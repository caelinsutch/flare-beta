import { RootState } from "./store";

const selectUser = (state: RootState) => state.user.user;
const selectUsers = (state: RootState) => state.users.users;

export { selectUser, selectUsers };
