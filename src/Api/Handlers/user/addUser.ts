import { NextApiRequest } from "next";
import { userCollection } from "../../Firebase/firestore";
import { sendText } from "../../Twilio";

const addUser = async (req: NextApiRequest) => {
  const { name, phone, instagram, userId } = req.body;

  await userCollection.doc(userId).set({
    userId,
    createdAt: Date.now(),
    name,
    phone,
    instagram,
  });

  // Send Welcome SMS
  await sendText(
    phone,
    "Thanks for registering with Flare! We'll be using this phone number to send updates"
  );

  const newUser = await userCollection.doc(userId).get();

  return { user: newUser.data() };
};

export default addUser;
