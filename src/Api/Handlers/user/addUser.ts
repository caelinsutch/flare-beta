import { NextApiRequest } from "next";

import { NewUserDbo, User } from "@Models";

import { userCollection } from "@Api/Firebase";
import { sendText } from "@Api/Twilio";

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
