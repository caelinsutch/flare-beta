import { Review } from "@Models";

import { reviewCollection } from "@Api/Firebase";

const getUserReviews = async (
  userId: string
): Promise<Review[] | undefined> => {
  const snapshot = await reviewCollection.where("userId", "==", userId).get();
  const data = snapshot.docs
    .map((d) => d.data() as Review)
    .filter((d) => !d.deleted)
    .sort((a, b) => b.createdAt - a.createdAt);

  return data;
};

export default getUserReviews;
