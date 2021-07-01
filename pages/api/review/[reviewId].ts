import { NextApiRequest, NextApiResponse } from "next";

import { deleteReview } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

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
