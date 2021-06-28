import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../../src/Api/Utils";
import { getParty } from "../../../../src/Api/Handlers";

const Party = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", () => {
    const { partyId } = req.query;
    return getParty(partyId as string);
  });

export default Party;
