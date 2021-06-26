import { userCollection } from "../../Firebase/firestore";

const getUser = async (phone: string) => {
  const userSnapshot = await userCollection.where("phone", "==", phone).get();
  const u = await Promise.all(
    userSnapshot.docs.map((a) => ({ userId: a.id, ...a.data() }))
  );

  return u[0];
};

export default getUser;
