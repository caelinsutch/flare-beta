import { Party } from "@Models";

import { partyCollection } from "@Api/Firebase";

const getParties = async (): Promise<{ parties: Party[] }> => {
  const snapshot = await partyCollection.get();

  const parties = snapshot.docs.map((d) => d.data() as Party);

  return {
    parties,
  };
};

export default getParties;
