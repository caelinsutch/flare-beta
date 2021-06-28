import { partyCollection, userCollection } from "../../Firebase/firestore";
import { Party, PartyDbo } from "../../../Models/Party";
import { UserDbo } from "../../../Models/User";

const getParty = async (partyId: string): Promise<{ party: Party }> => {
  const snapshot = await partyCollection.doc(partyId).get();

  const partyDbo: PartyDbo = snapshot.data() as PartyDbo;

  const admin = await Promise.all(
    partyDbo.admin.map(async (userId) => {
      const res = await userCollection.doc(userId).get();
      return res.data() as UserDbo;
    })
  );

  const party: Party = {
    ...partyDbo,
    admin,
  };

  if (snapshot.exists) {
    return { party };
  } else {
    const e = new Error("Party does not exist");
    e.name = "404";
    throw e;
  }
};
export default getParty;
