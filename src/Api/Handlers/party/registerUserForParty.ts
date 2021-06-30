import { partyCollection, userCollection } from "../../Firebase/firestore";
import { Party, PartyAttendee } from "../../../Models";
import { UserDbo } from "../../../Models";

const registerUserForParty = async (partyId: string, userId: string) => {
  const partySnapshot = await partyCollection.doc(partyId).get();
  const userSnapshot = await userCollection.doc(userId).get();

  if (partySnapshot.exists && userSnapshot.exists) {
    const oldParty: Party = partySnapshot.data() as Party;
    const user: UserDbo = userSnapshot.data() as UserDbo;

    const newAttendee: PartyAttendee = {
      userId,
      name: user.name,
      createdAt: Date.now().valueOf(),
    };

    await partyCollection.doc(partyId).update({
      attendees: [...oldParty.attendees, newAttendee],
    });

    await userCollection.doc(userId).update({
      attending: [user.attending, partyId],
    });

    return { status: "ok" };
  } else {
    throw Error("Party or user not found");
  }
};

export default registerUserForParty;
