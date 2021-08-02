import * as firebase from "firebase-admin";

import { Party, PartyAttendee, UserDbo } from "@Models";

import { partyCollection, userCollection } from "@Api/Firebase";

const registerUserForParty = async (partyId: string, userId: string) => {
  const partySnapshot = await partyCollection.doc(partyId).get();
  const userSnapshot = await userCollection.doc(userId).get();

  if (partySnapshot.exists && userSnapshot.exists) {
    const oldParty: Party = partySnapshot.data() as Party;
    const user: UserDbo = userSnapshot.data() as UserDbo;

    if (
      oldParty.attendees.find((a) => a.userId === userId) &&
      user.attending.includes(partyId)
    )
      throw Error("User already registered!");

    const newAttendee: PartyAttendee = {
      userId,
      name: user.name,
      createdAt: Date.now().valueOf(),
    };

    if (!oldParty.attendees.find((a) => a.userId === userId))
      await partyCollection.doc(partyId).update({
        attendees: firebase.firestore.FieldValue.arrayUnion(newAttendee),
      });

    if (!user.attending.includes(partyId))
      await userCollection.doc(userId).update({
        attending: firebase.firestore.FieldValue.arrayUnion(partyId),
      });

    return { status: "ok" };
  } else {
    throw Error("Party or user not found");
  }
};

export default registerUserForParty;
