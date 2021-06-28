import { Review } from "../../../Models";
import { reviewCollection } from "../../Firebase/firestore";

const getUserReviews = async (
  userId: string
): Promise<Review[] | undefined> => {
  const snapshot = await reviewCollection.where("userId", "==", userId).get();
  const data = snapshot.docs
    .map((d) => d.data() as Review)
    .filter((d) => !d.deleted);

  return data;
};

export default getUserReviews;
