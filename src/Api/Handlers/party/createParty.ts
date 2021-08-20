import dayjs from "dayjs";
import _ from "lodash";

import {
  getParty,
  getUser,
  partyCollection,
  registerUserForParty,
  addPartyToUserHostList,
} from "@Api";
import { NewParty, Party, PartyDbo, User } from "@Models";

const createParty = async (newParty: NewParty): Promise<{ party?: Party }> => {
  let partyId = _.kebabCase(newParty.name);
  const admins = (await Promise.all(
    newParty.admins.map((a) => getUser(a))
  )) as {
    user: User;
  }[];

  const prevDoc = await partyCollection.doc(partyId).get();

  if (prevDoc.exists) {
    partyId += String(dayjs().valueOf());
  }

  await partyCollection.doc(partyId).set({
    ...newParty,
    createdAt: Date.now().valueOf(),
    partyId,
    attendees: [],
  } as PartyDbo);

  await Promise.all(
    admins.map(({ user }) => addPartyToUserHostList(user.userId, partyId))
  );

  await Promise.all(
    admins.map(({ user }) => registerUserForParty(partyId, user.userId))
  );

  return getParty(partyId);
};

export default createParty;
