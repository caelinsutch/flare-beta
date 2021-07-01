import { NextApiRequest, NextApiResponse } from "next";

import { getUsersParties } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

const UserParties = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", getUsersParties, true);

export default UserParties;
