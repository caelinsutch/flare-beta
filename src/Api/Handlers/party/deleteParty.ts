import * as firebase from "firebase-admin";

import { partyCollection, userCollection } from "@Api";
import { StatusOk } from "@Models";

const deleteParty = async (partyId: string): Promise<StatusOk> => {
  await partyCollection.doc(partyId).update({
    deleted: true,
  });

  const attending = await userCollection
    .where("attending", "array-contains", partyId)
    .get();

  await Promise.all(
    attending.docs
      .map((a) => a.data())
      .map((a) =>
        userCollection.doc(a.userId).update({
          attending: firebase.firestore.FieldValue.arrayRemove(partyId),
        })
      )
  );

  const hosting = await userCollection
    .where("hosting", "array-contains", partyId)
    .get();

  await Promise.all(
    hosting.docs
      .map((a) => a.data())
      .map((a) =>
        userCollection.doc(a.userId).update({
          attending: firebase.firestore.FieldValue.arrayRemove(partyId),
        })
      )
  );

  return { status: "ok" };
};

export default deleteParty;
