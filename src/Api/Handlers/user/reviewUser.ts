import { NewUserReview, UserReview } from "../../../Models/User";
import { getUser } from "./index";
import { userCollection } from "../../Firebase/firestore";

const reviewUser = async (userId: string, newReview: NewUserReview) => {
  const { user } = await getUser(userId);
  if (user) {
    const review: UserReview = {
      name: "Anonymous",
      ...newReview,
      createdAt: Date.now().valueOf(),
    };
    const res = await userCollection
      .doc(userId)
      .collection("reviews")
      .add(review);

    await userCollection.doc(userId).collection("reviews").doc(res.id).update({
      reviewId: res.id,
    });

    return getUser(userId);
  } else {
    const e = new Error("User not found!");
    e.name = "404";
    throw e;
  }
};

export default reviewUser;
