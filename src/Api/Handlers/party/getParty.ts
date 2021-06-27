import { partyCollection } from "../../Firebase/firestore";

const getParty = async (partyId: string) => {
  const snapshot = await partyCollection.doc(partyId).get();

  if (snapshot.exists) {
    return { party: snapshot.data() };
  } else {
    const e = new Error("Party does not exist");
    e.name = "404";
    throw e;
  }
};
export default getParty;
