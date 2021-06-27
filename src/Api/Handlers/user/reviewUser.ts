import { NewUserReview } from "../../../Models/User";
import { getUser } from "./index";
import { userCollection } from "../../Firebase/firestore";

const reviewUser = async (userId: string, newReview: NewUserReview) => {
  const { user } = await getUser(userId);
  if (user) {
    const currReviews = user?.reviews ?? [];
    await userCollection.doc(userId).update({
      reviews: [
        ...currReviews,
        {
          ...newReview,
          createdAt: Date.now().valueOf(),
        },
      ],
    });
    return getUser(userId);
  } else {
    const e = new Error("User not found!");
    e.name = "404";
    throw e;
  }
};

export default reviewUser;
