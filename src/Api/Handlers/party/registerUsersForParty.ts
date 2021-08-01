import { registerUserForParty } from "@Api";

const registerUsersForParty = async (partyId: string, userIds: string[]) => {
  await Promise.all(
    userIds.map((userId) => registerUserForParty(partyId, userId))
  );
  return { status: "ok" };
};

export default registerUsersForParty;
