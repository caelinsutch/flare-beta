import { Review } from "@Models";

import { reviewCollection } from "@Api/Firebase/firestore";

const getReview = async (reviewId: string): Promise<Review | undefined> => {
  const snapshot = await reviewCollection.doc(reviewId).get();

  const review = snapshot.data() as Review;

  if (review.deleted) {
    return undefined;
  }

  return review;
};

export default getReview;
