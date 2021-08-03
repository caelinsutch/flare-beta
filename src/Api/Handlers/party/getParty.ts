import { Party, PartyDbo, UserDbo } from "@Models";

import { partyCollection, userCollection } from "@Api/Firebase";
import { getPartyReviews } from "@Api/Handlers";

const getParty = async (
  partyId: string,
  notFoundError: boolean = true
): Promise<{ party?: Party }> => {
  const snapshot = await partyCollection.doc(partyId).get();

  if (!snapshot.exists) {
    if (notFoundError) {
      const e = new Error("Party does not exist");
      e.name = "404";
      throw e;
    } else {
      return { party: undefined };
    }
  }

  const partyDbo: PartyDbo = snapshot.data() as PartyDbo;

  const admin = await Promise.all(
    partyDbo.admin.map(async (userId) => {
      const res = await userCollection.doc(userId).get();
      return res.data() as UserDbo;
    })
  );

  const { reviews } = await getPartyReviews(partyId);

  const party: Party = {
    ...partyDbo,
    admin,
    reviews,
  };

  return { party };
};
export default getParty;
