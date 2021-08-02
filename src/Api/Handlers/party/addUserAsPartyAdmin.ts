import * as firebase from "firebase-admin";

import { partyCollection } from "@Api";
import { StatusOk } from "@Models";

const addUserAsPartyAdmin = async (
  partyId: string,
  userId: string
): Promise<StatusOk> => {
  await partyCollection.doc(partyId).update({
    admins: firebase.firestore.FieldValue.arrayUnion(userId),
  });

  return { status: "ok" };
};

export default addUserAsPartyAdmin;
