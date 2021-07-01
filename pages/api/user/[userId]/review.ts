import { NextApiRequest, NextApiResponse } from "next";

import { reviewUser } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

const ReviewUser = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", async () => {
    const { userId } = req.query;
    const { review } = req.body;
    return reviewUser(userId as string, review);
  });

export default ReviewUser;
