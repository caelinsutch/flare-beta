import { RootState } from "./store";

const selectUser = (state: RootState) => state.user.user;

export { selectUser };
