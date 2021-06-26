import { NextApiRequest, NextApiResponse } from "next";
import { getUsers, deleteUsers } from "../../src/Api/Handlers";
import { wrapper } from "../../src/Api/Utils";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  await wrapper(req, res, "GET", getUsers);
  await wrapper(req, res, "DELETE", deleteUsers);
};

export default Users;
