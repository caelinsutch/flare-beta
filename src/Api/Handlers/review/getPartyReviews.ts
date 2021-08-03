import { reviewCollection } from "@Api";
import { Review } from "@Models";

const getPartyReviews = async (partyId: string) => {
  const reviewSnapshots = await reviewCollection
    .where("partyId", "==", partyId)
    .get();

  const reviews: Review[] = reviewSnapshots.docs
    .map((doc) => doc.data() as Review)
    .filter((r) => !r.deleted);

  return { reviews };
};

export default getPartyReviews;
