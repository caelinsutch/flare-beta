import * as firebase from "firebase-admin";

import { userCollection } from "@Api";
import { StatusOk } from "@Models";

const addPartyToUserHostList = async (
  userId: string,
  partyId: string
): Promise<StatusOk> => {
  await userCollection.doc(userId).update({
    hosting: firebase.firestore.FieldValue.arrayUnion(partyId),
  });

  return { status: "ok" };
};

export default addPartyToUserHostList;
