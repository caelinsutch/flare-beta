import { NextApiRequest, NextApiResponse } from "next";

import { getUser } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

const GetUser = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", async () => {
    const { userId } = req.query;
    return getUser(userId as string);
  });

export default GetUser;
