import { NextApiRequest, NextApiResponse } from "next";

import { getParty, partyCollection } from "@Api";

const Temp = async (req: NextApiRequest, res: NextApiResponse) => {
  const doc = await getParty("kiki-underground");

  const foundIds1: string[] = [];

  const newAttendees = doc.party?.attendees.filter((a) => {
    if (foundIds1.includes(a.userId) && !a.amountPaid) {
      return false;
    }
    foundIds1.push(a.userId);
    return true;
  });

  const a = await partyCollection.doc("kiki-underground").update({
    attendees: newAttendees,
  });

  const foundIds: string[] = [];
  const duplicates = doc.party?.attendees.filter((a) => {
    if (foundIds.includes(a.userId)) {
      return true;
    }
    foundIds.push(a.userId);
    return false;
  });
  res.send({
    newCount: newAttendees?.length,
    count: duplicates?.length,
    base: doc.party?.attendees.length,
  });
};

export default Temp;
