import { RootState } from "./store";

const selectUser = (state: RootState) => state.user.user;
const selectUsers = (state: RootState) => state.users.users;
const selectParties = (state: RootState) => state.parties.parties;
const selectAuth = (state: RootState) => state.user.auth;

export { selectUser, selectUsers, selectParties, selectAuth };
