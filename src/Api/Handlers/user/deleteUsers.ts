import { NextApiRequest } from "next";
import { userCollection } from "../../Firebase/firestore";

const deleteUsers = async (req: NextApiRequest) => {
  console.log(JSON.parse(req.body).userIds);
  const { userIds }: { userIds: string[] } = JSON.parse(req.body);

  if (!userIds) {
    throw new Error("No userIds to delete");
  }

  await Promise.all(userIds.map((id) => userCollection.doc(id).delete()));

  return { userIds };
};

export default deleteUsers;
