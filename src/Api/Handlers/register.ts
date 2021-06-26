import { userCollection } from "../Firebase/firestore";
import { User } from "../../Models/User";
import { sendText } from "../Twilio";

const register = async (userId: string, user: Omit<User, "userId">) => {
  await userCollection.doc(userId).set({
    userId,
    createdAt: Date.now(),
    ...user,
  });

  // Send Welcome SMS
  await sendText(
    user.phone,
    "Thanks for registering with Flare! We'll be using this phone number to send updates"
  );

  const newUser = await userCollection.doc(userId).get();

  return newUser.data();
};

export default register;
