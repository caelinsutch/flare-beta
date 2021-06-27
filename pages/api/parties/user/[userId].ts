import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../../src/Api/Utils";
import { getUsersParties } from "../../../../src/Api/Handlers";

const UserParties = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", getUsersParties);

export default UserParties;
