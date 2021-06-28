import { NewReview, NewReviewDbo } from "../../../Models";
import { getUser } from "../user";
import { reviewCollection, userCollection } from "../../Firebase/firestore";

const reviewUser = async (userId: string, newReview: NewReview) => {
  const { user } = await getUser(userId);
  if (user) {
    const review: NewReviewDbo = {
      name: "Anonymous",
      ...newReview,
      userId,
      createdAt: Date.now().valueOf(),
    };

    const res = await reviewCollection.add(review);

    await reviewCollection.doc(res.id).update({
      reviewId: res.id,
    });

    await userCollection.doc(userId).update({
      reviews: [...user.reviews, res.id],
    });

    return getUser(userId);
  } else {
    const e = new Error("User not found!");
    e.name = "404";
    throw e;
  }
};

export default reviewUser;
