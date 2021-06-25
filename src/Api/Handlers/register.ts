import { userCollection } from "../Firebase/firestore";
import { User } from "../../Models/User";
import { sendText } from "../Twilio";

const register = async (accountId: string, user: User) => {
  const u = await userCollection.where("phone", "==", user.phone).get();

  if (u.size > 0) {
    throw Error("User exists");
  }

  await userCollection.doc(accountId).set({
    accountId,
    createdAt: Date.now(),
    ...user,
  });

  // Send Welcome SMS
  await sendText(user.phone, "This is confirming you've joined the waitlist!");

  const newUser = await userCollection.doc(accountId).get();

  return newUser.data();
};

export default register;
