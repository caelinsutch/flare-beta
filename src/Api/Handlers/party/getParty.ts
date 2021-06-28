import { partyCollection, userCollection } from "../../Firebase/firestore";
import { Party, PartyDbo } from "../../../Models";
import { UserDbo } from "../../../Models";

const getParty = async (partyId: string): Promise<{ party: Party }> => {
  const snapshot = await partyCollection.doc(partyId).get();

  if (!snapshot.exists) {
    const e = new Error("Party does not exist");
    e.name = "404";
    throw e;
  }

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

  return { party };
};
export default getParty;
