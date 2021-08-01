import dayjs from "dayjs";

import { Party } from "@Models";

import { partyCollection } from "@Api/Firebase";

const getParties = async (
  upcoming?: boolean
): Promise<{ parties: Party[] }> => {
  const snapshot = await partyCollection.get();

  const parties = snapshot.docs.map((d) => d.data() as Party);

  if (upcoming) {
    const filteredParties = parties.filter((p) => p.date > dayjs().valueOf());
    return {
      parties: filteredParties,
    };
  }

  return {
    parties,
  };
};

export default getParties;
