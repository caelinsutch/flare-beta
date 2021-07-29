import { User, UserDbo, Review } from "@Models";

import { userCollection } from "@Api/Firebase";

import { getParty } from "../party";
import { getUserReviews } from "../review";

const getUser = async (userId: string) => {
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
    userDbo.hosting?.map(async (partyId) => (await getParty(partyId)).party) ??
      []
  );

  const attending = await Promise.all(
    userDbo.attending?.map(
      async (partyId) => (await getParty(partyId)).party
    ) ?? []
  );

  const user: User = {
    ...userDbo,
    hosting,
    attending,
    reviews,
  };

  return { user };
};

export default getUser;
