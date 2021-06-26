import { userCollection } from "../../Firebase/firestore";
import { NextApiRequest } from "next";

const getUser = async (req: NextApiRequest) => {
  const { id } = req.query;
  const userSnapshot = await userCollection.where("userId", "==", id).get();
  const u = await Promise.all(userSnapshot.docs.map((a) => a.data()));

  return { user: u[0] };
};

export default getUser;
