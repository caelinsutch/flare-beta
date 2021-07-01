import { NextApiRequest, NextApiResponse } from "next";

import { getParty } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

const Party = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", () => {
    const { partyId } = req.query;
    return getParty(partyId as string);
  });

export default Party;
