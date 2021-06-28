import { partyCollection } from "../../Firebase/firestore";
import { Party } from "../../../Models/Party";

const getParties = async (): Promise<{ parties: Party[] }> => {
  const snapshot = await partyCollection.get();

  const parties = snapshot.docs.map((d) => d.data() as Party);

  return {
    parties,
  };
};

export default getParties;
