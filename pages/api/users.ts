import { NextApiRequest, NextApiResponse } from "next";

import { getUsers, deleteUsers } from "@Api/Handlers";
import { wrapper } from "@Api/Utils";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  await wrapper(req, res, "GET", getUsers, true);
  await wrapper(req, res, "DELETE", deleteUsers, true);
};

export default Users;
