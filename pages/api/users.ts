import { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../src/Api/Handlers";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await getUsers();
      return res.status(200).send({ users });
    } catch (e) {
      return res.status(500).send({ error: e.toString() });
    }
  }
};

export default Users;
