import _ from "lodash";

import {
  addUserAsPartyAdmin,
  getParty,
  getUser,
  partyCollection,
  registerUserForParty,
} from "@Api";
import { NewParty, Party, PartyDbo, User } from "@Models";

const createParty = async (newParty: NewParty): Promise<{ party: Party }> => {
  let partyId = _.kebabCase(newParty.name);
  const admins = (await Promise.all(newParty.admin.map((a) => getUser(a)))) as {
    user: User;
  }[];

  const prevDoc = await partyCollection.doc(partyId).get();

  if (prevDoc.exists) {
    partyId += String(Date.now().valueOf());
  }

  await partyCollection.doc(partyId).set({
    ...newParty,
    createdAt: Date.now().valueOf(),
    partyId,
    attendees: [],
  } as PartyDbo);

  await Promise.all(
    admins.map(({ user }) => addUserAsPartyAdmin(partyId, user.userId))
  );

  await Promise.all(
    admins.map(({ user }) => registerUserForParty(partyId, user.userId))
  );

  return getParty(partyId);
};

export default createParty;
