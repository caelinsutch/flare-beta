import { getParty, partyCollection, reviewCollection } from "@Api";
import { NewReview, NewReviewDbo } from "@Models";

const reviewParty = async (partyId: string, newReview: NewReview) => {
  const partyDoc = await partyCollection.doc(partyId).get();
  if (partyDoc.exists) {
    const review: NewReviewDbo = {
      name: "Anonymous",
      ...newReview,
      partyId,
      createdAt: Date.now().valueOf(),
    };

    const res = await reviewCollection.add(review);

    await reviewCollection.doc(res.id).update({
      reviewId: res.id,
    });
    return getParty(partyId);
  } else {
    const e = new Error("Party not found!");
    e.name = "404";
    throw e;
  }
};

export default reviewParty;
