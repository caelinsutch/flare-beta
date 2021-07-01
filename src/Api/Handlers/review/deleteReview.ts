import { UserDbo, Review } from "@Models";

import { reviewCollection, userCollection } from "@Api/Firebase";

import getReview from "./getReview";

const deleteReview = async (
  reviewId: string
): Promise<{ review: Review } | undefined> => {
  const review = await getReview(reviewId);

  if (review) {
    const userSnapshot = await userCollection.doc(review.userId).get();
    const user = userSnapshot.data() as UserDbo;

    await userCollection.doc(user.userId).update({
      reviews: user.reviews.filter((r) => r !== reviewId),
    });

    await reviewCollection.doc(reviewId).update({
      deleted: true,
      deletedAt: Date.now().valueOf(),
    });

    return { review };
  }
  return undefined;
};

export default deleteReview;
