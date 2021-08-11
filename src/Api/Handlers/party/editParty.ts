import { partyCollection } from "@Api";
import { Party } from "@Models";

const editParty = async (
  partyId: string,
  party: Partial<Omit<Party, "partyId">>
) => {
  const partyDoc = await partyCollection.doc(partyId).get();
  if (!partyDoc.exists) {
    throw Error("Party doesn't exist");
  }

  return partyCollection.doc(partyId).set({
    ...partyDoc.data(),
    ...party,
  });
};

export default editParty;
