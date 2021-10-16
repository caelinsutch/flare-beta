import {
  Party,
  PartyAttendee,
  PartyAttendeeStatus,
  partyAttendeeStatusEnglish,
  User,
} from "@Models";

import { sendText } from "@Api/Twilio";

import { partyCollection, userCollection } from "../../Firebase";

const changeUserStatus = async (
  partyId: string,
  userId: string,
  status: PartyAttendeeStatus
) => {
  const partySnapshot = await partyCollection.doc(partyId).get();
  const userSnapshot = await userCollection.doc(userId).get();
  if (partySnapshot.exists && userSnapshot.exists) {
    const oldParty: Party = partySnapshot.data() as Party;
    const user: User = userSnapshot.data() as User;

    const newAttendees: PartyAttendee[] = [
      ...oldParty.attendees.filter((a) => a.userId !== userId),
      {
        ...(oldParty.attendees.find(
          (a) => a.userId === userId
        ) as PartyAttendee),
        status,
      },
    ];

    await partyCollection.doc(partyId).update({
      attendees: newAttendees,
    });

    try {
      await sendText(
        user.phone,
        `Plots: You're now ${partyAttendeeStatusEnglish[status]} ${oldParty.name}. More info at https://plots.party/party/${partyId}!`
      );
    } catch (e) {
      console.error(e);
    }

    return { status: "ok" };
  }
  throw Error("Party or user not found!");
};

export default changeUserStatus;
