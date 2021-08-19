import { NextApiRequest } from "next";

import { NewUserDbo } from "@Models";

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

  await userCollection.doc(userId).set({ ...newUser, userId });

  // Send Welcome SMS
  if (phone !== "+19161234567") {
    await sendText(
      phone,
      "Thanks for registering with Plots! We'll be using this phone number to send updates"
    );
  }

  const updatedUser = (await userCollection.doc(userId).get()).data();

  return { user: updatedUser };
};

export default addUser;
