import { userCollection } from "@Api/Firebase";

const getUserByPhone = async (phone: string) => {
  const snapshot = await userCollection.where("phone", "==", phone).get();

  const users = snapshot.docs.map((d) => d.data());

  return { users };
};

export default getUserByPhone;
