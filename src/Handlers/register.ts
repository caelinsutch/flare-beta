import { userCollection } from "../Firebase/firestore";
import { User } from "../Models/User";

const register = async (user: User) => {
  const u = await userCollection.where("phone", "==", user.phone).get();
  if (u.size > 0) {
    throw Error("User exists");
  }
  const res = await userCollection.add({ createdAt: Date.now(), ...user });

  return (await res.get()).data();
};

export default register;
