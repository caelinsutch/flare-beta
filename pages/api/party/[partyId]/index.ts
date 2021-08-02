import { NextApiRequest, NextApiResponse } from "next";

import { deleteParty, getParty } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

const Party = async (req: NextApiRequest, res: NextApiResponse) => {
  await wrapper(req, res, "GET", () => {
    const { partyId } = req.query;
    return getParty(partyId as string);
  });
  await wrapper(req, res, "DELETE", () => {
    const { partyId } = req.query;
    return deleteParty(partyId as string);
  });
};

export default Party;
