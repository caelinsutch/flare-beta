import { NextApiRequest, NextApiResponse } from "next";

import { getPartyReviews, wrapper } from "@Api";

const GetPartyReviews = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", async () => {
    const { partyId } = req.query;
    return getPartyReviews(partyId as string);
  });

export default GetPartyReviews;
