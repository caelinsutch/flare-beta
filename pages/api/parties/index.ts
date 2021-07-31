import { NextApiRequest, NextApiResponse } from "next";

import { wrapper } from "@Api";

import getParties from "@Api/Handlers/party/getParties";

const Parties = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", getParties, true);

export default Parties;
