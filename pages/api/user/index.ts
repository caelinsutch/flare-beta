import { NextApiRequest, NextApiResponse } from "next";

import addUser from "@Api/Handlers/user/addUser";
import { wrapper } from "@Api/Utils";

const User = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "POST", addUser);

export default User;
