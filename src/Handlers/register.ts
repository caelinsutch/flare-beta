import { userCollection } from "../Firebase/firestore";

const register = async (user: User) => {
  const u = await userCollection.where("phone", "==", user.phone).get();
  if (u.size > 0) {
    throw Error("User exists");
  }
  const res = await userCollection.add(user);

  return (await res.get()).data();
};

export default register;
