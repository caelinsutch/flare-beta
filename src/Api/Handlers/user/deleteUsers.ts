import { NextApiRequest } from "next";

import { userCollection } from "@Api/Firebase";

const deleteUsers = async (req: NextApiRequest) => {
  const { userIds }: { userIds: string[] } = JSON.parse(req.body);

  if (!userIds) {
    throw new Error("No userIds to delete");
  }

  await Promise.all(
    userIds.map((id) =>
      userCollection.doc(id).update({
        deleted: true,
      })
    )
  );

  // TODO Sync parties where the user is and delete from that obj

  return { userIds };
};

export default deleteUsers;
