import { Review } from "@Models";

import { reviewCollection } from "@Api/Firebase";

import getReview from "./getReview";

const deleteReview = async (
  reviewId: string
): Promise<{ review: Review } | undefined> => {
  const review = await getReview(reviewId);

  if (review) {
    await reviewCollection.doc(reviewId).update({
      deleted: true,
      deletedAt: Date.now().valueOf(),
    });

    return { review };
  }
  return undefined;
};

export default deleteReview;
