import { NextApiRequest } from "next";
import { partyCollection } from "../../Firebase/firestore";

const getUsersParties = async (req: NextApiRequest) => {
  const { userId } = req.query;

  const snapshot = await partyCollection
    .where("admin", "array-contains", userId)
    .get();

  const parties = snapshot.docs.map((d) => d.data());

  return { parties };
};

export default getUsersParties;
