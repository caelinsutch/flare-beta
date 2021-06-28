import { userCollection } from "../../Firebase/firestore";
import { UserDbo } from "../../../Models";

const getUsers = async (): Promise<{ users: UserDbo[] }> => {
  const userSnapshots = await userCollection.get();
  const users = await Promise.all(
    userSnapshots.docs.map(
      (d) =>
        ({
          userId: d.id,
          ...d.data(),
        } as UserDbo)
    )
  );
  return { users };
};

export default getUsers;
