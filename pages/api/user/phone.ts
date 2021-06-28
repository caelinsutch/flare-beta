import { NextApiRequest, NextApiResponse } from "next";
import { getUserByPhone } from "../../../src/Api/Handlers/user";
import { wrapper } from "../../../src/Api/Utils";

const Phone = async (req: NextApiRequest, res: NextApiResponse) =>
  wrapper(req, res, "GET", () => {
    const { phone } = req.query;
    return getUserByPhone(phone as string);
  });

export default Phone;
