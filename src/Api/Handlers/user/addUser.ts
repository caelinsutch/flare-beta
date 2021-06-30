import { NextApiRequest } from "next";
import { userCollection } from "../../Firebase/firestore";
import { sendText } from "../../Twilio";
import { NewUserDbo, User } from "../../../Models";

const addUser = async (req: NextApiRequest) => {
  const { name, phone, socials, userId, bio } = req.body;

  const newUser: NewUserDbo = {
    name,
    phone,
    reviews: [],
    attending: [],
    hosting: [],
    createdAt: Date.now(),
    socials: socials ?? {},
    bio: bio ?? "",
  };

  await userCollection.doc(userId).set(newUser);

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
