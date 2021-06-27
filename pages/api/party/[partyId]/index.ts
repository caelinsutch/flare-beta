import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../../src/Api/Utils";
import { getParty } from "../../../../src/Api/Handlers";

const Party = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", () => {
    console.log(req.query);
    const { partyId } = req.query;
    return getParty(partyId as string);
  });

export default Party;
