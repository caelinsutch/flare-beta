import dayjs from "dayjs";

import { partyCollection, userCollection } from "@Api";
import { Party, PartyAttendee } from "@Models";

const markUserPaid = async (
  partyId: string,
  userId: string,
  amountPaid: number,
  orderId: string
) => {
  const partySnapshot = await partyCollection.doc(partyId).get();
  const userSnapshot = await userCollection.doc(userId).get();

  if (partySnapshot.exists && userSnapshot.exists) {
    const oldParty: Party = partySnapshot.data() as Party;

    const newAttendees: PartyAttendee[] = [
      ...oldParty.attendees.filter((a) => a.userId !== userId),
      {
        ...(oldParty.attendees.find(
          (a) => a.userId === userId
        ) as PartyAttendee),
        amountPaid,
        orderId,
        paidAt: dayjs().valueOf(),
      },
    ];

    await partyCollection.doc(partyId).update({
      attendees: newAttendees,
    });

    return { status: "ok" };
  }
  throw Error("Party or user not found!");
};

export default markUserPaid;
