import { userCollection } from "../Firebase/firestore";

const getUsers = async () => {
  const userSnapshots = await userCollection.get();
  return await Promise.all(userSnapshots.docs.map((d) => d.data()));
};

export default getUsers;
