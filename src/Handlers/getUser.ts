import { userCollection } from "../Firebase/firestore";

const getUser = async (phone: string) => {
  const userSnapshot = await userCollection.where("phone", "==", phone).get();
  return userSnapshot.docs.map((a) => a.data())[0];
};

export default getUser;
