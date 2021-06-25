import { userCollection } from "../../Firebase/firestore";

const getUsers = async () => {
  const userSnapshots = await userCollection.get();
  const users = await Promise.all(userSnapshots.docs.map((d) => d.data()));
  return { users };
};

export default getUsers;
