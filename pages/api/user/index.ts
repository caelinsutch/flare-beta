import { NextApiRequest, NextApiResponse } from "next";
import { wrapper } from "../../../src/Api/Utils";
import addUser from "../../../src/Api/Handlers/user/addUser";

const User = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", addUser);

export default User;
