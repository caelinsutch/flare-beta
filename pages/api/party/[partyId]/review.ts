import { NextApiRequest, NextApiResponse } from "next";

import { reviewParty, wrapper } from "@Api";

const ReviewParty = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", async () => {
    const { partyId } = req.query;
    const { review } = req.body;
    return reviewParty(partyId as string, review);
  });

export default ReviewParty;
