import { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../src/Api/Handlers";
import { wrapper } from "../../src/Api/Utils";

const Users = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", getUsers);

export default Users;
