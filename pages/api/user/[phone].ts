import { NextApiRequest, NextApiResponse } from "next";
import getUser from "../../../src/Api/Handlers/user/getUser";

const GetUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { phone } = req.query;

    try {
      if (typeof phone === "string") {
        const user = await getUser(phone as string);
        return res.status(200).send({ user });
      }
      return res.status(500).send({ error: "Error parsing email" });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
};

export default GetUser;
