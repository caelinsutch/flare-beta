import { User, UserDbo, Review, Party } from "@Models";

import { userCollection } from "@Api/Firebase";

import { getParty } from "../party";
import { getUserReviews } from "../review";

const getUser = async (userId: string): Promise<{ user?: User }> => {
  const userSnapshot = await userCollection.doc(userId).get();

  if (!userSnapshot.exists) {
    const e = new Error("User does not exist");
    e.name = "404";
    throw e;
  }

  const reviews = (await getUserReviews(userId)) as Review[];

  if (!userSnapshot.exists) {
    return { user: undefined };
  }

  const userDbo = userSnapshot.data() as UserDbo;

  const hosting = await Promise.all(
    userDbo.hosting?.map(
      async (partyId) => (await getParty(partyId, false))?.party as Party
    ) ?? []
  );

  const attending = await Promise.all(
    userDbo.attending?.map(
      async (partyId) => (await getParty(partyId, false))?.party as Party
    ) ?? []
  );

  const user: User = {
    ...userDbo,
    hosting: hosting.filter((p) => Boolean(p)).sort((a, b) => b.date - a.date),
    attending: attending
      .filter((p) => Boolean(p))
      .sort((a, b) => b.date - a.date),
    reviews,
  };

  return { user };
};

export default getUser;
