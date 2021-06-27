import { userCollection } from "../../Firebase/firestore";
import { UserDbo } from "../../../Models/User";
import { getParty } from "../party";

const getUser = async (userId: string) => {
  const userSnapshot = await userCollection.doc(userId).get();

  if (!userSnapshot.exists) {
    return { user: undefined };
  }

  const userDbo = userSnapshot.data() as UserDbo;

  const hosting = await Promise.all(
    userDbo.hosting?.map(async (partyId) => (await getParty(partyId)).party) ??
      []
  );

  const attending = await Promise.all(
    userDbo.attending.map(async (partyId) => (await getParty(partyId)).party)
  );

  const user = {
    ...userDbo,
    hosting,
    attending,
  };

  return { user };
};

export default getUser;
