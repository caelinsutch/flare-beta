import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../../src/Api/Utils";
import { reviewUser } from "../../../../src/Api/Handlers";

const ReviewUser = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", async () => {
    const { userId } = req.query;
    const { review } = req.body;
    return reviewUser(userId as string, review);
  });

export default ReviewUser;
