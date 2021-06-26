import { userCollection } from "../Firebase/firestore";
import { User } from "../../Models/User";
import { sendText } from "../Twilio";

const register = async (user: Omit<User, "createdAt" | "userId">) => {
  const u = await userCollection.where("phone", "==", user.phone).get();

  if (u.size > 0) {
    throw Error("User exists");
  }

  const res = await userCollection.add({ ...user, createdAt: Date.now() });

  // Send Welcome SMS
  await sendText(user.phone, "This is confirming you've joined the waitlist!");

  return (await res.get()).data();
};

export default register;
