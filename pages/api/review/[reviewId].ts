import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../src/Api/Utils";
import { deleteReview } from "../../../src/Api/Handlers";

const Review = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(
    req,
    res,
    "DELETE",
    () => {
      const { reviewId } = req.query;

      return deleteReview(reviewId as string);
    },
    true
  );

export default Review;
