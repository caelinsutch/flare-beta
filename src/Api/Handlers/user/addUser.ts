import { NextApiRequest } from "next";
import { userCollection } from "../../Firebase/firestore";
import { sendText } from "../../Twilio";
import { User } from "../../../Models/User";

const addUser = async (req: NextApiRequest) => {
  const { name, phone, instagram } = req.body;

  const newUser: Omit<User, "userId"> = {
    name,
    phone,
    instagram,
    reviews: [],
    attending: [],
    hosting: [],
    createdAt: Date.now(),
  };

  const res = await userCollection.add(newUser);

  const userId = res.id;

  await userCollection.doc(userId).update({
    userId,
  });

  // Send Welcome SMS
  await sendText(
    phone,
    "Thanks for registering with Flare! We'll be using this phone number to send updates"
  );

  const updatedUser = await userCollection.doc(userId).get();

  return { user: updatedUser };
};

export default addUser;
