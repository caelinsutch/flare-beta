import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../src/Api/Utils";
import { getUser } from "../../../src/Api/Handlers/user";

const GetUser = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", getUser);

export default GetUser;
